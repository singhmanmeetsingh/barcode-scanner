import React, { Component } from 'react';
import Quagga from 'quagga';

class Scanner extends Component {
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment', // or user
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['code_128_reader'],
        },
        locate: true,
      },
      function(err) {
        if (err) {
            debugger;
          return console.log(err)
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start()
      },
    )
    Quagga.onDetected(this._onDetected)
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected)
  }

  _onDetected = result => {
      debugger;
    this.props.onDetected(result)
  }

  render() {
    return <div id="interactive" className="viewport" />
  }
}

export default Scanner
