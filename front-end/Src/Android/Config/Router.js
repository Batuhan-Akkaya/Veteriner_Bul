import {StackNavigator} from 'react-navigation';
import HomeScreen from '../Pages/Home';
import ClinicDetailScreen from '../Pages/ClinicDetail';

const App = StackNavigator({
    Home: {screen: HomeScreen},
    ClinicDetail: {screen: ClinicDetailScreen}
}, {
    navigationOptions: {
        title: 'Veteriner Bul',
        headerStyle: {backgroundColor: '#3498db'}
    }
});

export default App;