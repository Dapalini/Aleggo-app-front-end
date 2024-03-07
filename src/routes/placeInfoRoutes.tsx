import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import BasicInfo from '../components/places/basicInfo/basicInfo';
import BasicInfoEdit from '../components/places/basicInfo/basicInfoEdit';
import Workplan from '../components/places/workplan/workplan';
import WorkplanEdit from '../components/places/workplanEdit/workplanEdit';
import CurrentContract from '../components/places/currentContract/currentContract';
import PlaceTaskManager from '../components/places/placeTaskManager';
import Calendar from '../components/places/calendar/calendar';
import HistoryData from '../components/places/historyData/historyData';
import NotFound from '../components/common/notFound';
import { BasicInfoEditContextProvider } from '../contexts/basicInfoEditContext';
import BasicInfoFormikContext from '../formikContexts/basicInfoEditFormikContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const PlaceInfoRoutes = ({ place, loading }: any) => {

  const { basicInfo } = place

  return ( 
    <Routes>
      <Route path='basicInfo' element={<BasicInfo basicInfo={basicInfo}/>} />
      <Route path='basicInfoEdit' element={
        <BasicInfoEditContextProvider>
          <DndProvider backend={HTML5Backend}>
            <BasicInfoFormikContext basicInfo={basicInfo}>
              <BasicInfoEdit basicInfo={basicInfo} loading={loading}/>
            </BasicInfoFormikContext>
          </DndProvider>
        </BasicInfoEditContextProvider>
      }
      />
      <Route
        path='workplan'
        element={<Workplan />}
      />
      <Route
        path='workplanEdit'
        element={
          <WorkplanEdit/>
        }
      />
      <Route path='placeTaskManager' element={<PlaceTaskManager />} />
      <Route path='calendar' element={<Calendar />} />
      <Route path='currentContract' element={<CurrentContract />} />
      <Route path='historyData' element={<HistoryData />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
   );
}
 
export default PlaceInfoRoutes;