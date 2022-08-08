import React from "react";

const Dashboard = ({ goToPage }) => {
  return (
    <div className="container">
      <h4>Welcome to Dashboard</h4>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => goToPage(`/dashboard/todo`)}
      >
        Create your TodDo List
      </button>
    </div>
  );
};

export default Dashboard;
