import { useReducer } from "react";
import BootcampContext from "./bootcamp-context";

const initialBootcamps = [];

const bootcampsReducer = (state, action) => {
  if (action.type === "ADD") {
  }
  if (action.type === "EDIT") {
  }
  if (action.type === "REMOVE") {
  }
};

const BootcampProvider = (props) => {
  const [bootcampsState, dispatchBootcampsAction] = useReducer(
    bootcampsReducer,
    initialBootcamps
  );

  const addBootcamp = (bootcamp) => {};

  const editBootcamp = (bootcampId, updatedBootcamp) => {};

  const removeBootcamp = (bootcampId) => {};

  const bootcampContext = {
    bootcamps: bootcampsState.bootcamps,
    addBootcamp: addBootcamp,
    editBootcamp: editBootcamp,
    removeBootcamp: removeBootcamp,
  };

  return (
    <BootcampContext.Provider value={bootcampContext}>
      {props.children}
    </BootcampContext.Provider>
  );
};

export default BootcampProvider;
