import { createContext, useState } from "react";

export const TaskContext = createContext();
export const TaskProvider = ({children}) =>{
    const [tasks, setTask] = useState([])

    return(
    <TaskContext.Provider value={{ tasks, setTask }}>
        {children}
    </TaskContext.Provider>
    ) 
}