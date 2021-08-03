import React from 'react'
import styles from './projects.module.css'
import { Button, Divider } from 'antd'
import CompletedProjects from './completedprojects'
import OngoingProjects from './ongoingprojects'
import CreateProject from './createproject'
import 
{WarningTwoTone,
ExclamationCircleTwoTone,
CheckCircleTwoTone,
CloseCircleTwoTone
} from '@ant-design/icons'

const Projects=props=>{
    const [create, setCreate]=React.useState(false)
    const [projectData, setProjectData]=React.useState({
        ongoing:[],
        completed:[]
    })
    console.log(projectData)
    React.useEffect(()=>{
        if(props.allproject){
            let ongoingProject=props.allproject.map((val, index)=>{
                if(!val.live){
                    return val
                }
                else{
                    return null
                }
            })
            let completedprojects=props.allproject.map((val, index)=>{
                if(val.live){
                    return val
                }
                else{
                    return null
                }
            })

            ongoingProject=ongoingProject.filter(val=>val!=null)
            completedprojects=completedprojects.filter(val=>val!=null)

            setProjectData({
                ongoing:ongoingProject,
                completed:completedprojects
            })
        }
    },[props.allProject])

    return (
        <div className={styles.project}>
            <div>
        <Button onClick={()=>setCreate(!create)} type="primary">{create?"Close":"Create New Project"}</Button>
        </div>
        {create?<div>
            <Divider orientation="left">Create a New Project</Divider>
                <CreateProject data={props}/>
        </div>:null}
        <div>
            <Divider orientation="left">Ongoing Projects</Divider>
            <OngoingProjects icon="ongoing" data={projectData.ongoing}/>
        </div>

        <div>
        <Divider orientation="left">Completed Projects</Divider>
            <OngoingProjects icon="completed" data={projectData.completed}/>
        </div>
                <div className={styles.legends}>
                <div><strong>Legends:</strong></div>
                <div><CheckCircleTwoTone twoToneColor="#52c41a" /> Completed</div>
                <div><CloseCircleTwoTone twoToneColor="#eb2f96"/> Incomplete</div> 
                <div><WarningTwoTone twoToneColor="#ffcc00"/> Project Deadline in less than fifteen days</div>
                <div><WarningTwoTone twoToneColor="#eb2f96"/> Project Deadline in less than five days</div>
                <div><ExclamationCircleTwoTone twoToneColor="#eb2f96"/> Project Deadline Expired</div>
                </div>

        </div>
    )
}

export default Projects