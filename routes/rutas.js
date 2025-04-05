import routerEmployee from "./employeeRouter.js";
import routerDepartment from "./departmentRouter.js";
import routerSupervisor from "./supervisorRouter.js";
import routerArea from "./areaRouter.js";

// Permite manejar las rutas con el ruteo
function routerApi(app) {
    app.use("/employee", routerEmployee);
    app.use("/department", routerDepartment);
    app.use("/supervisor", routerSupervisor);
    app.use("/area", routerArea);
}

export default routerApi;
