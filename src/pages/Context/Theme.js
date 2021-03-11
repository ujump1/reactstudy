


import {ThemeContext,themes} from '../../context/ThemeContext';
import * as React from "react";


class Theme extends React.Component {

    static contextType = ThemeContext;
    render() {
        console.log(this.context);
        let theme = this.context;
        let background;
        if(theme ==='dark'){
             background = themes.light.background;
            console.log(background);
        }
        return (
        <div>
            <p>从context中获取到的主题{theme}</p>
            <button style={{backgroundColor: background}}> 按钮</button>
        </div>


    );
    }

}

export default Theme;