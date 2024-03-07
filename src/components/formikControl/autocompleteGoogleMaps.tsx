import { useCallback } from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import configData from "../../config/default.json"
import { debounce } from '@mui/material/utils';
import { useFormikContext, Field, ErrorMessage } from 'formik';
import { useField } from 'formik';

const GOOGLE_MAPS_API_KEY = configData.googleMapsApiKey;

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

export default function AutocompleteGoogleMaps(props: any) {
  const loadScript = useCallback((src: string, position: HTMLElement | null, id: string) => {
    if (!position) {
      return;
    }
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
  },[])


  const { 
    name,
    label,
    disabled = false
  } = props

  const { setFieldValue } = useFormikContext()
  const [ field ] = useField(name)
  const { value } = field

  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }
    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        400,
      ),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];
        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <>
      <label className="form-label" style={{marginBottom: "-1px"}} htmlFor={name}>{label}</label>    
      <Field name={name}>
        {
          ({form, field}: any) => {
            const { onBlur } = field
            const { errors, touched } = form

            return (
              <Autocomplete
                id={name}
                getOptionLabel={(option) =>
                  typeof option === 'string' ? option : option.description
                }
                onBlur={(e) => onBlur(e)}
                disabled={disabled}
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                noOptionsText="No locations"
                onChange={(event: any, newValue: PlaceType | null) => {
                  setOptions(newValue ? [newValue, ...options] : options);
                  console.log(newValue)
                  setFieldValue(name, newValue);
                }}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                sx={{
                  backgroundColor: disabled ? "#eee" : "white",
                  borderRadius: 1.5,
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderRadius: 1.5,
                      borderColor: errors[name] && touched[name] ? "#DC263D" : "#cacaca"
                    }
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
                renderOption={(props, option) => {
                  const matches =
                    option.structured_formatting.main_text_matched_substrings || [];
                  const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match: any) => [match.offset, match.offset + match.length]),
                  );
          
                  return (
                    <li {...props}>
                      <Grid container alignItems="center">
                        <Grid item sx={{ display: 'flex', width: 44 }}>
                          <LocationOnIcon sx={{ color: 'text.primary' }} />
                        </Grid>
                        <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                          {parts.map((part, index) => (
                            <Box
                              key={index}
                              component="span"
                              sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                            >
                              {part.text}
                            </Box>
                          ))}
                          <Typography variant="body2" color="text.secondary">
                            {option.structured_formatting.secondary_text}
                          </Typography>
                        </Grid>
                      </Grid>
                    </li>
                  );
                }}
              />
            )
          }
        }
      </Field>
      <div
        style={{marginTop: "-3px"}}
        className="form-text text-danger"
      >
        <ErrorMessage name={name}/>
      </div>
    </>
  );
}