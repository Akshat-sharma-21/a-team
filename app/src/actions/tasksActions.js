import axios from "axios";
import { baseUrl } from "../FirebaseConfig";

export const SET_ALL_TASKS = "SET_ALL_TASKS";

export function completeTasks(tid, task, step) {
  // function to mark tasks as completed
  axios
    .post(`${baseUrl}/task`, {
      tid: tid,
      task: task,
      step: step,
    })
    .catch((err) => {
      console.error(err); // logging the error
    });
}

export function setAllTasksAction(transaction) {
  // pure action
  let Tasks = {
    PreApprovalTasks: transaction.PreApproval.Tasks,
    FindAgentTasks: transaction.FindAgent.Tasks,
    FindHomeTasks: transaction.FindHome.Tasks,
    HomeInspectionTasks: transaction.HomeInspection.Tasks,
    EscrowTitleTasks: transaction.EscrowTitle.Tasks,
    HomeInsuranceTasks: transaction.HomeInsurance.Tasks,
    ClosingTasks: transaction.Closing.Tasks,
  };
  return {
    type: SET_ALL_TASKS,
    Tasks,
  };
}
