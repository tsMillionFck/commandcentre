import React, {useState, useEffect ,useRef} from "react";
import { useSystem } from "../Context/SystemContext";
//So what we did here, we created a hook name useDraggable, which is used for a use to drag any element assigned with this hook.
//How does it works
export const useDraggable = (title, initialPos = { x : 100, y: 100 }) => {//we set an initial Position of the element in x, y.
    const [pos, setPos] = useState(initialPos);//use state to save and change the pos
    const [isDragging, setIsDragging] = useState(false)
    const dragging = useRef(false);//define a variable which checks if the element is dragging or not, like a switch which determines if the element should drag or not
    const offset = useRef({ x : 0, y : 0 });//what is this the offset?
    const wasDragging = useRef(false);
    const { dispatch, place } = useSystem();

    
    
    //We create a function which trackes the mouse coordinates and on mouse down, and set the new coordiantes to offset
    const onMouseDown = (e) => {
        dragging.current = true;
        wasDragging.current = true;
        setIsDragging(true)
        
        offset.current = {
            x: e.clientX - pos.x,//wait is the offset the main element in which the element is going to be dragged, or coordinates reference wrt to the elememt (like the getBoardingCliectRect())
            y: e.clientY - pos.y
        }
    };
    
    useEffect(() => {
        setPos(initialPos)
    }, [place.resetTrigger])
    
    //A mouse down function, which changes switch of the dragging element.
    //We create a useEffect hook, which is going to run when the hook is called
    useEffect(() => {
        const GRID_SIZE = 20;
        
        //defining a mouse move, changing the position of the element.
        const onMouseMove = (e) => {
            if (!dragging.current) return;
            const rawX = e.clientX - offset.current.x;
            const rawY = e.clientY - offset.current.y;

            const snappedX = Math.round(rawX/GRID_SIZE)*GRID_SIZE
            const snappedY = Math.round(rawY/GRID_SIZE)*GRID_SIZE

            setPos({
                x: snappedX,
                y: snappedY
            })
        };
        
        const onMouseUp = () => {
            if (dragging.current && wasDragging.current) {
                dispatch({
                    type: 'ADD_LOG',
                    payload: `${title} relocated to [${Math.round(pos.x), Math.round(pos.y)}]`,
                    logType: 'info'
                });
                
                wasDragging.current = false;
            }
            dragging.current = false;
            setIsDragging(false)
        }
        
        //added event listners for the browser to know which function to fire.
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        
        return () => {
            //removing the event listners so the browser does not eat up the space.
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
    }, [pos, title, dispatch])
    

    
    //In short terms, we are taking the element, tracking the mouseDown and mouseMove for it to move. Select the element (we save the elemet position respect to the main element, and then change the pos as the mouse move)
    return { pos, onMouseDown, isDragging}
}
