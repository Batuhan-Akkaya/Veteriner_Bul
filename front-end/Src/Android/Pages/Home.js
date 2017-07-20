import React, {Component} from 'react';
import {StatusBar, ListView, TouchableNativeFeedback, View} from 'react-native';
import {Container, Content, Text, Picker, Item, Spinner, Button} from 'native-base';
import Style from '../Components/Css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            cities: ['Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
                'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
                'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
                'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir',
                'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
                'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
                'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
                'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
                'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'],
            selectedCity: 'Adana',
            clinics: ''
        }
    }

    componentDidMount() {
        fetch('https://veteriner.herokuapp.com/clinics/getByCity/Adana').then(res => res.json()).then((json) => {
            this.setState({
                clinics: json
            });
        });
    }

    cityPickerChange(value: string) {
        this.setState({clinics: ''});
        fetch('https://veteriner.herokuapp.com/clinics/getByCity/' + value).then(res => res.json()).then((json) => {
            this.setState({
                clinics: json,
                selectedCity: value
            });
        });
    }

    renderRow(clinic) {
        const { navigate } = this.props.navigation;
        return (
            <TouchableNativeFeedback onPress={ () => navigate('ClinicDetail', { id: clinic._id })}>
                <View style={Style.listItem}>
                    <Text style={{color: '#000'}}>{clinic.title}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }

    render() {
        let cityPickerItem = this.state.cities.map((s, i) => {
            return <Item key={i} value={s} label={s}/>
        });


        if (this.state.clinics === '') {
            return (
                <Container>
                    <StatusBar backgroundColor='#2980b9' barStyle='light-content'/>
                    <View style={Style.searchBarContainer}>
                        <View style={Style.searchBarInput}>
                            <Picker
                                supportedOrientations={['portrait', 'landscape']}
                                iosHeader="Şehir Seç"
                                headerBackButtonText="Geri"
                                mode="dialog"
                                style={{color: '#000'}}
                                selectedValue={this.state.selectedCity}
                                onValueChange={this.cityPickerChange.bind(this)}
                            >
                                {cityPickerItem}
                            </Picker>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
                        <Spinner color='#3498db' />
                    </View>
                </Container>
            );
        } else {
            return (
                <Container>
                    <StatusBar backgroundColor='#2980b9' barStyle='light-content'/>
                    <View style={Style.searchBarContainer}>
                        <View style={Style.searchBarInput}>
                            <Picker
                                supportedOrientations={['portrait', 'landscape']}
                                iosHeader="Şehir Seç"
                                headerBackButtonText="Geri"
                                mode="dialog"
                                style={{color: '#000'}}
                                selectedValue={this.state.selectedCity}
                                onValueChange={this.cityPickerChange.bind(this)}
                            >
                                {cityPickerItem}
                            </Picker>
                        </View>
                    </View>
                    <Content>
                        <ListView
                            enableEmptySections={true}
                            renderRow={this.renderRow.bind(this)}
                            dataSource={this.ds.cloneWithRows(this.state.clinics)}
                        />
                    </Content>
                </Container>
            );
        }
    }
}

export default Home;