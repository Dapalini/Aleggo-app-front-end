import * as React from 'react';
import { useState, useEffect } from "react"
import FormikControl from '../../formikControl/formikControl';
import { DndProvider, useDragDropManager } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FieldArray, useFormikContext } from 'formik';
import TestComponent from './testComponent';
import DropZone from '../../../wrappers/dropZone';

const TestContext = () => {
  
  const API_URL = "http://jsonplaceholder.typicode .com"

  const [ loading, setLoading ] = useState(true) 
  const [ users, setUsers ] = useState<any>([])
  const [ posts, setPosts ] = useState<any>([])
  const [ comments, setComments ] = useState<any>(true)
  const [displayed, setDisplayed] = useState("users")
 
  const state = useState("H2lo")

  console.log(state)

  // console.log(users, posts, comments)

  useEffect(()=>{
    const loadPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts/`)
        const postJson = await response.json()
        setPosts(postJson)        
      } catch (err) {
        console.log(err)
      }
    }
    const loadUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users/`)
        const usersJson = await response.json()
        console.log(usersJson)
        setUsers(usersJson)
      } catch (err) {
        console.log(err)
      }
    }
    const loadComments = async () => {
      try {
        const response = await fetch(`${API_URL}/comments/`)
        const commentsJson = await response.json()
        setComments(commentsJson)        
      } catch (err) {
        console.log(err)
      }
    }
    loadPosts()
    loadUsers()
    loadComments()
  },[])

	const [dragIndex, setDragIndex] = useState<boolean | number>(false);
	const [isDragging, setIsDragging] = useState(false);

  const { values, setValues }: any = useFormikContext()

  const formik = useFormikContext()

  // console.log(formik)

 	const handleDragStart = (drag: any, index: any) => {
		setIsDragging(drag);
		setDragIndex(index);
	};

	const handleDragEnd = () => {
		setIsDragging(false);
		setDragIndex(false);
	};

  const handleDrop = (item: any, newIndex: any, oldIndex: any) => {
    console.log(item, newIndex, oldIndex)
    console.log(values)
  }
  
  // console.log(values)

  const [ color, setColor ] = useState("")

  const userKeyArray = ["id", "name", "username", "email", "address", "company"]
  const postsKeyArray = ["userId", "id", "title", "body"]
  const commentsKeyArray = ["postId", "id", "name", "email", "body"]

  return (
    <>
    <div className='container row' style={{height: "60px", position: "sticky"}}>
      <div 
        onClick={()=> setDisplayed("users")}
        className='col-4 d-flex justify-content-center align-items-center' 
        style={{
          cursor: "pointer",
          fontWeight: "bold", 
          fontSize: "1,5rem", 
          border: "1px solid black",
          background: `${ displayed === "users" ? "black" : "white"}`,
          color: `${ displayed === "users" ? "white" : "black"}`
        }}
      >
        Users  
      </div>
      <div 
        onClick={()=> setDisplayed("posts")}
        className='col-4 d-flex justify-content-center align-items-center' style={{cursor: "pointer", fontWeight: "bold", fontSize: "1,5rem", border: "1px solid black", background: `${ displayed === "posts" ? "black" : "white"}`, color: `${ displayed === "posts" ? "white" : "black"}`}}>
        Posts
      </div>
      <div
        onClick={()=> setDisplayed("comments")} 
        className='col-4 d-flex justify-content-center align-items-center' style={{cursor: "pointer", fontWeight: "bold", fontSize: "1,5rem", border: "1px solid black", background: `${ displayed === "comments" ? "black" : "white"}`, color: `${ displayed === "comments" ? "white" : "black"}`}}>
        Comments 
      </div>
    </div>
    <div className="container row">
      <table className='table'>
        { displayed && displayed === "users" ?
          <>
            <thead style={{position: "sticky"}}>
              <tr>
                <th scope="col" style={{border: "3px double black"}}>#</th>
                {
                  userKeyArray.map((item)=>(
                      <th scope="col" style={{border: "3px double black"}}>{item}</th>
                    )
                  )
                }
              </tr>
            </thead>
            <tbody style={{overflowY: "auto"}}>
              {
                users.map((item: any, index: any) => {
                  return (
                    <tr key={item.id}>
                      <th scope="col" style={{border: "3px double black"}}>{index}</th>
                      { userKeyArray.map((key)=>(
                        <td style={{border: "3px double black"}}>{JSON.stringify(item[key])}</td>
                      ))
                      }
                    </tr>
                  )
                }) 
              }
         </tbody> 
        </>
        : null
        }
        { displayed && displayed === "posts" ?
          <>
            <thead>
              <tr>
                <th scope="col" style={{border: "3px double black"}}>#</th>
                {
                  postsKeyArray.map((item)=>(
                      <th scope="col" style={{border: "3px double black"}}>{item}</th>
                    )
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                posts.map((item: any, index: any) => {
                  return (
                    <tr key={item.id}>
                      <th scope="col" style={{border: "3px double black"}}>{index}</th>
                      { postsKeyArray.map((key)=>(
                        <td style={{border: "3px double black"}}>{JSON.stringify(item[key])}</td>
                      ))
                      }
                    </tr>
                  )
                }) 
              }
         </tbody> 
        </>
        : null
        }
        { displayed && displayed === "comments" ?
          <>
            <thead>
              <tr>
                <th scope="col" style={{border: "3px double black"}}>#</th>
                {
                  commentsKeyArray.map((item)=>(
                      <th scope="col" style={{border: "3px double black"}}>{item}</th>
                    )
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                comments.map((item: any, index: any) => {
                  return (
                    <tr key={item.id}>
                      <th scope="col" style={{border: "3px double black"}}>{index}</th>
                      { commentsKeyArray.map((key)=>(
                        <td style={{border: "3px double black"}}>{JSON.stringify(item[key])}</td>
                      ))
                      }
                    </tr>
                  )
                }) 
              }
         </tbody> 
        </>
        : null
        }
      </table>
    </div>

      {/* <DndProvider backend={HTML5Backend}>
        <div className='row d-flex justify-content-center'>
          <div style={{width: "400px"}}>
            <div className="border rounded shadow mt-4 d-flex justify-content-center align-items-center" style={{height: "400px", background: `${color}` }}>
              <h3>
                {color}
              </h3>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
            <input
              autoFocus
              className='container form-control mt-2 shadow'
              type="text"
              onChange={(e) => setColor(e.target.value)}
              value={color}
              placeholder="Add color name"
            />
            </form>
          </div>
        </div>
        <FieldArray
          name=""
          render={(arrayHelpers) => {

            // console.log(arrayHelpers)

            const { form } = arrayHelpers
            console.log("Test outside area", form.values)

            const checkValues = () => {
              const { form } = arrayHelpers
              console.log("Test area", form.values)
            }

            return (
              <>
              {
                values.optionsArray.map((comp: any, index: any) => {
                  return (
                    <div key={index}>
                      <DropZone
                        transferDrop={()=> null}
                        item="CONTACT"
                        index={index}
                        isDragging={isDragging}
                        raiseDrop={(item: any, oldIndex: any, newIndex: any) => {
                          handleDrop(item, oldIndex, newIndex)
                          checkValues()
                          return
                          }}
                      />
                      <div onDragEnd={handleDragEnd}>
                        <TestComponent
                          index={index}
                          raiseDragStart={handleDragStart}
                          isDragging={isDragging}
                          name={`optionsArray[${index}]`}
                        />
                      </div>
                    </div>
                  )
                })
              }
              </>
            )
            
          }
          }
        />


        
      </DndProvider> */}
    </>
   );
}
 
export default TestContext;