import { createStore } from "redux";
import { app } from "./reducer";

const configStore = () => {
    return createStore(
        app
    )
}

export default configStore