import React, {Component} from "react";

import FileAnalyzer from "./FileAnalyzer";
import GraphsViewer from "../graph/GraphsViewer";
import FormFileLabel from "react-bootstrap/FormFileLabel";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import css from "./reader.module.css";
import Overview from "./overview/Overview";
import {
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";

export default class Reader extends Component {
    state = {
        filesInfo: [],
        hamWords: [],
        spamWords: [],
        hamMessagesLength: [],
        spamMessagesLength: [],
        isProceed: false
    }

    showFile = e => {
        this.setState({
            filesInfo: [],
            hamWords: [],
            spamWords: [],
            hamMessagesLength: [],
            spamMessagesLength: [],
            isProceed: true
        });
        Promise.all(this.readFilesAsPromises(Array.from(e.target.files)))
            .then(data => {
                this.proceedFilesAsPromises(data)
                    .then(data => this.setState(data.reduce((first, sec) => {
                        return {
                            hamWords: first.hamWords.concat(sec.hamWords),
                            spamWords: first.spamWords.concat(sec.spamWords),
                            hamMessagesLength: first.hamMessagesLength.concat(sec.hamMessagesLength),
                            spamMessagesLength: first.spamMessagesLength.concat(sec.spamMessagesLength)
                        }
                    })));
                this.setState({
                    filesInfo: data,
                    isProceed: false
                })
            });
    }

    proceedFilesAsPromises(data) {
        return Promise.all(data
            .map(file => new FileAnalyzer(file))
            .map(fileAnalyzer => {
                return new Promise((resolve => resolve(fileAnalyzer.analyzeFile())))
            }));
    }

    readFilesAsPromises = files => {
        return files.map(file => {
            return new Promise((resolve => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve({
                    fileName: file.name,
                    text: fileReader.result
                });
                fileReader.readAsText(file);
            }))
        });
    }

    render() {
        const {history} = this.props
        const {hamWords, spamWords, hamMessagesLength, spamMessagesLength, filesInfo} = this.state;
        return <>
            <Navbar variant={"dark"}>
                <Nav className="mr-auto">
                    <Link className={css.link} to="/overview">Overview</Link>
                    <Link className={css.link} to="/graphs">Graphs</Link>
                    <Link className={css.link} to="/tools">Tools</Link>
                </Nav>
                <div>
                    {!this.state.isProceed
                        ? (
                            <>
                                <FormFileLabel>
                                    <div className={css.infoMessage}>Just click here and choose files to read</div>
                                    <input type="file" multiple={true} hidden={true} onChange={e => this.showFile(e)}/>
                                </FormFileLabel>
                            </>)
                        : <div className={css.infoMessage}>Proceed data, wait please</div>
                    }
                </div>
            </Navbar>
            <Switch>
                <Route history={history} path='/overview'>
                    <Overview filesInfo={filesInfo}/>
                </Route>
                <Route history={history} path='/graphs'>
                    <GraphsViewer hamWords={hamWords}
                                  spamWords={spamWords}
                                  hamMessagesLength={hamMessagesLength}
                                  spamMessagesLength={spamMessagesLength}/>
                </Route>
                <Redirect from='/' to='/overview'/>
            </Switch>
        </>;
    }
}