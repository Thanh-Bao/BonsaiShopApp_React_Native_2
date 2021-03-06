import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';



export default function App(props) {
    const { width } = useWindowDimensions();
    const source = {
        html: `${props.source}`
    };
    return (
        <RenderHtml
            contentWidth={width}
            source={source}
        />
    );
}