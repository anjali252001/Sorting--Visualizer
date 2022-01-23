import React, { Component } from 'react';
import { Container, Button ,Dropdown,Row,Col } from "react-bootstrap";
class Home extends Component {
    constructor(props) {
        super(props)
        this.colorSetPrimary = ["#000000", "#0C2461", "#ff9f43"];
        this.colorSetSecondary = ["#9B0000", "yellow", "#ee5253"];
        this.state = {
            array: [],
            arraySize: 40,
            primaryColor: this.colorSetPrimary[0],
            secondaryColor: this.colorSetSecondary[0],
            successColor: "#000B49",
            visSpeed: 100,
            containerColor: "#FFC600",


        }
            ;
    }
    componentDidMount() {
        this.generateArray();
    }

    setDelay = async (speed) => {
        let delay = speed === 0 ? this.state.visSpeed : speed;
        await new Promise((resolve) => { setTimeout(() => { resolve(); }, delay) });

    }
    generateArray = () => {
        const array = [];
        for (let i = 0; i < this.state.arraySize; i++) {
            array.push({ val: this.getRandom(10, 500), bgcolor: this.state.primaryColor });

        }

        this.setState({ array });
    }
    getRandom = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    changeArraySize = async (e) => {
        await this.setState({ arraySize: e.target.value });
        this.generateArray();
    }
    choosePrimaryColor = async (i) => {
        await this.setState({ primaryColor: this.colorSetPrimary[i] })
    }
    swap = (arr, i, j) => {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        arr[i].bgcolor = this.state.primaryColor;
        arr[j].bgcolor = this.state.primaryColor;
        return arr;
    };
    setColor = async (arr, i, color) => {
        arr[i].bgcolor = color;
        await this.setState({ array: arr });
        return arr;
    };

    bubbleSort = async () => {
        let arr = this.state.array;
        let n = this.state.arraySize;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                arr = await this.setColor(arr, j, this.state.secondaryColor);
                arr = await this.setColor(arr, j + 1, this.state.secondaryColor);
                await this.setDelay(0);
                if (arr[j].val > arr[j + 1].val) { arr = this.swap(arr, j, j + 1); }

                arr = await this.setColor(arr, j, this.state.primaryColor);
                arr = await this.setColor(arr, j + 1, this.state.primaryColor);
            }
            arr[n - i - 1].bgcolor = this.state.successColor;

            arr = await this.setColor(arr, n - i - 1, this.state.successColor);
            this.setState({ array: arr });



        }
        arr = await this.setColor(arr, 0, this.state.successColor);
    }

    selectionSort = async () => {
        let arr = this.state.array;
        let n = arr.length;
        let i, j, minIndex;

        for (i = 0; i < n - 1; i++) {
            minIndex = i;
            arr = await this.setColor(arr, i, "#6998AB");
            for (j = i + 1; j < n; j++) {
                arr = await this.setColor(arr, j, this.state.secondaryColor);
                await this.setDelay(0);
                if (arr[j].val < arr[minIndex].val) {
                    if (minIndex !== i) {
                        arr = await this.setColor(arr, minIndex, this.state.primaryColor);

                    }
                    minIndex = j;


                }
                else {
                    arr = await this.setColor(arr, j, this.state.primaryColor);
                }


            }

            await this.setDelay(0);
            arr = this.swap(arr, minIndex, i);
            arr = await this.setColor(arr, minIndex, this.state.primaryColor);
            arr = await this.setColor(arr, i, this.state.successColor);


        }
        arr = await this.setColor(arr, n - 1, this.state.successColor);

    };





    insertionSort = async () => {
        let arr = this.state.array;
        let n = this.state.arraySize;
        let i, j, k;
        arr = await this.setColor(arr, 0, this.state.successColor);
        for (i = 1; i < n; i++) {
            arr = await this.setColor(arr, i, this.state.secondaryColor);

            await this.setDelay(0);
            k = arr[i].val;
            j = i - 1;
            while (j >= 0 && arr[j].val > k) {
                arr = await this.setColor(arr, j, this.state.secondaryColor);
                arr[j + 1].val = arr[j].val;
                j -= 1;
                await this.setDelay(0);
                for (let t = i; t >= 0; t--) {
                    arr = await this.setColor(arr, t, this.state.successColor);

                }
            }

            arr[j + 1].val = k;
            arr = await this.setColor(arr, i, this.state.successColor);


        }
        await this.setState({ array: arr });

    };

    endAlgo = async () => {
        await this.setState({ disableButtons: false, containerColor: "#B1D0E0" });

        await this.setDelay(300);
        await this.setState({ containerColor: "#FFC600" });
    };

    visualizeAlgo = async (algo) => {
        await this.setState({ disableButtons: true });
        switch (algo) {
            case "bubble":
                await this.bubbleSort();
                await this.endAlgo();
                break;
            case "selection":
                await this.selectionSort();
                await this.endAlgo();
                break;
            case "insertion":
                await this.insertionSort();
                await this.endAlgo();
                break;
            default:
                await this.setState({ disableButtons: false });
                break;
        }
    };

    changeVisSpeed = async(e) => {
       await this.setState({ visSpeed: e.target.value });
    }
    render() {
        return (
            <React.Fragment>
              
                <div className='main'>
                    <Container >
                    <nav >
                    <span style={{color:"#9B0000", fontWeight:"bold" ,fontSize:"2rem"}} >Sorting Visualizer</span>
                        <br/><br/>
                        <Row>
                        <Col lg={6} sm={6} xs={6}>
                        <Button 
                                variant ="danger" 
                                onClick={this.generateArray}
                                    disabled={this.state.disableButtons}>
                                    Generate new array
                                </Button>
                                </Col>
                                <Col lg={6} sm={6} xs={6}>
                        <Dropdown>
  <Dropdown.Toggle variant="dark" id="dropdown-basic">
    Select Algorithm
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item as ="button" onClick={() => this.visualizeAlgo("bubble")}
                                    disabled={this.state.disableButtons}> 
                                
                                    Bubble Sort
                               </Dropdown.Item>
    <Dropdown.Item as="button" onClick={() => this.visualizeAlgo("selection")}
                                    disabled={this.state.disableButtons}> 
                                    Selection Sort
                               </Dropdown.Item>
    <Dropdown.Item as="button"  onClick={() => this.visualizeAlgo("insertion")}
                                    disabled={this.state.disableButtons}> 
                                    Insertion Sort
                              </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
</Col>
</Row>


                </nav>
               
                    <div >
                        <div >
                            <div>
                                <div >
                                    <label >Number</label>
                                </div>
                                <div >
                                    <input
                                        type="range"
                                        min="10"
                                        max="120"
                                        value={this.state.arraySize}
                                        onChange={this.changeArraySize}
                                        disabled={this.state.disableButtons}

                                    />
                                </div>
                            </div>
                            <div >
                                <div >
                                    <label>Speed</label>
                                </div>

                                <div >
                                    <input
                                        type="range"
                                        min="1"
                                        max="200"
                                        value={this.state.visSpeed}
                                        onChange={this.changeVisSpeed}
                                        className="speed-control"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    </Container>
                    <Container >
                    <div style={{ display: "flex", backgroundColor: this.state.containerColor }}>
                        {this.state.array.map((obj, index) => (
                            <div
                                className="arr_bars"
                                key={index}
                                style={{
                                    flex: 1,
                                    margin: "1px",
                                }}
                            >
                                <div
                                    className="arr_bars_span"
                                    key={index}
                                    style={{
                                        backgroundColor: obj.bgcolor,
                                        height: `${obj.val}px`,
                                        margin: "1px",
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
