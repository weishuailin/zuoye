let Board = React.createClass({
    getInitialState(){
         return {  arr:[]}
    },


    handlClik(event){
        var val = this.refs.myText.value;
          this.state.arr.push(val);
        this.setState({arr:this.state.arr})


    },

    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>珠峰留言版</h1>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.state.arr.map((item, index) => {
                                return <li key={index}>{item}</li>
                            })
                        }

                    </ul>
                </div>
                <div className="panel-footer">
                    <input ref="myText" type="text" className="form-control"/>
                    <button onClick={this.handlClik} className="btn btn-primary" >留言</button>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Board/>,document.querySelector('#container'));