import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import {Container, Content, List, ListItem, Text, Spinner, SwipeRow, Icon, Button, Badge} from 'native-base';
import Communications from 'react-native-communications';

class clinicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinicName: '',
            clinicPhone: '',
            clinicCity: '',
            clinicCounty: '',
            clinicAddress: ''
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        fetch('https://veteriner.herokuapp.com/clinics/getById/' + params.id)
            .then(res => res.json()).then((json) => {
            this.setState({
                clinicName: json[0].title,
                clinicPhone: json[0].tel,
                clinicCity: json[0].city,
                clinicCounty: json[0].county,
                clinicAddress: json[0].address
            });
        });
    }

    render() {
        if(this.state.clinicAddress !== '') {
            return (
                <Container>
                    <StatusBar backgroundColor="#2980b9" barStyle="light-content"/>
                    <Content>
                        <List>
                            <ListItem style={{marginLeft: 0}} itemDivider>
                                <Text>Klinik Adı:</Text>
                            </ListItem>
                            <ListItem style={{backgroundColor: '#fff', marginLeft: 0, paddingLeft: 15}}>
                                <Text>{this.state.clinicName}</Text>
                            </ListItem>
                            <ListItem style={{marginLeft: 0}} itemDivider>
                                <Text>Telefon:</Text>
                            </ListItem>
                            <SwipeRow leftOpenValue={90}
                                  left={
                                      <Button success onPress={() => Communications.phonecall(this.state.clinicPhone, true)}>
                                          <Icon active name="call" />
                                      </Button>
                                  }
                                  body={
                                      <View style={{backgroundColor: '#fff', height: 20, paddingLeft: 15}}>
                                          <Text>{this.state.clinicPhone}</Text>
                                      </View>
                                  }
                            />

                            <ListItem style={{marginLeft: 0}} itemDivider>
                                <Text>Şehir:</Text>
                            </ListItem>
                            <ListItem style={{backgroundColor: '#fff', marginLeft: 0, paddingLeft: 15}}>
                                <Text>{this.state.clinicCity}</Text>
                            </ListItem>
                            <ListItem style={{marginLeft: 0}} itemDivider>
                                <Text>İlçe:</Text>
                            </ListItem>
                            <ListItem style={{backgroundColor: '#fff', marginLeft: 0, paddingLeft: 15}}>
                                <Text>{this.state.clinicCounty}</Text>
                            </ListItem>
                            <ListItem style={{marginLeft: 0}} itemDivider>
                                <Text>Adres:</Text>
                            </ListItem>
                            <ListItem style={{backgroundColor: '#fff', marginLeft: 0, paddingLeft: 15}}>
                                <Text>{this.state.clinicAddress}</Text>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
            );
        } else {
            return (
                <Container>
                    <StatusBar backgroundColor='#2980b9' barStyle='light-content'/>
                    <View style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
                        <Spinner color='#3498db' />
                    </View>
                </Container>
            );
        }
    }
}

export default clinicDetail;