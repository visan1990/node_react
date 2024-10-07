
import { AuthProvider } from "./auth/AuthProvider";
import Rutas from "./routes";

const App = () => {

  return (
    <AuthProvider>
      <Rutas />
    </AuthProvider>
  );

}

export default App;