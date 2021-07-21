import React, { Component } from 'react'
import { Text, View, useWindowDimensions, ActivityIndicator } from 'react-native'
import NavigationBar from '../component/NavigationBar';
import PreventBackButtonNav from '../component/PreventBackButtonNav'
import Header from '../component/CustomHeader'
import axios from 'axios';
import RenderHtml from 'react-native-render-html';


class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productID: this.props.route.params.productID,
            product: null
        }

    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://baobaoshop.live/api/products/' + this.state.productID
        }).then((response) => {
            this.setState({
                product: response.data
            })
        }).catch((err) => {
            alert('lỗi lấy danh sách sản phẩm')
        })
    }

    render() {
        // const { width } = useWindowDimensions();

        return (
            <View style={{ flex: 1 }}>
                <PreventBackButtonNav />
                <Header title="Chi tiết sản phẩm" navigation={this.props.navigation} />
                {this.state.product == null ? <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                    :
                    <Text>{this.state.product.description}</Text>
                }
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <NavigationBar navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}

export default Detail


// import React, { Component } from 'react'
// import { Text, View, useWindowDimensions } from 'react-native'
// import NavigationBar from '../component/NavigationBar';
// import PreventBackButtonNav from '../component/PreventBackButtonNav'
// import Header from '../component/CustomHeader'
// import axios from 'axios';
// import RenderHtml from 'react-native-render-html';

// const source = {
//     html: `
// <p style='text-align:center;'>
//   Hello World!
// </p>`
// };

// export default function Detail(props) {
//     const { width } = useWindowDimensions();
//     return (
//         <View style={{ flex: 1 }}>
//             <PreventBackButtonNav />
//             <Header title="Chi tiết sản phẩm" navigation={props.navigation} />
//             {/* <Text>itemId:{state.product != null ? this.state.product.description : "aaaa"}</Text> */}
//             <View style={{ position: 'absolute', left: 0, right: 0, bottom: 4, justifyContent: 'center', alignItems: 'center' }}>
//                 <NavigationBar navigation={props.navigation} />
//             </View>
//         </View>
//     );
// }
