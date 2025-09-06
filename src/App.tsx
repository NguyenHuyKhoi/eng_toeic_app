import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GlobalAlert, globalAlertRef } from "@component";
import { store } from "@redux";
import { ToastContainer } from "react-toastify";
import { ExamDetailPage } from "./page/exam_detail";
import { ExamListPage } from "./page/exam_list";
import { ExamPracticePage } from "./page/exam_practice";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={``} element={<ExamListPage />} />
        <Route path={`/exam/:exam_id`} element={<ExamDetailPage />} />
        <Route
          path={`/exam_practice/:exam_id`}
          element={<ExamPracticePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppRoutes />
      <ToastContainer />
      <GlobalAlert ref={globalAlertRef} />
    </Provider>
  );
}

export default App;
