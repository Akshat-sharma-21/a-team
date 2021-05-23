export const SET_ALL_TASKS = "SET_ALL_TASKS";

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
