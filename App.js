import { TaskProvider } from './context/TaskContext';
import MainApp from './MainApp';

export default function App() {
  return (
    <TaskProvider>
      <MainApp />
    </TaskProvider>
  );
}
