import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './core/api/queryClient';
import './core/assets/styles/index.css';
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<h1 className="text-3xl font-bold underline">
				Hello
			</h1>
		</QueryClientProvider>
	);
}

export default App;
