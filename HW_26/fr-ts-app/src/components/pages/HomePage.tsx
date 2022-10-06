import BooksList from '../Bookslist';
import { Provider } from "react-redux";
import store from "../../redux/store";

const HomePage: React.FC = () => {
    return <div>
        <h3>HomePage</h3>
        {
            <Provider store={store}>
                <BooksList />
            </Provider>            
        }
    </div>
}

export default HomePage;