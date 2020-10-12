import React from "react";
import { Helmet } from "react-helmet";

class Designer extends React.Component {
            render() {
                <Helmet>
                        <title>Test</title>

                        <link rel="stylesheet" href="stimulsoft.designer.office2013.whiteblue.css"></link>
                        <link rel="stylesheet" href="stimulsoft.viewer.office2013.whiteblue.css"></link>

                        <script async="true" crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
                        <script async="true" crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
                        <script async="true" src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.25.0/babel.min.js"></script>
                        <script async="true" src="stimulsoft.reports.js"></script>
                        <script async="true" src="stimulsoft.viewer.js"></script>
                        <script async="true" src="stimulsoft.designer.js"></script>
                </Helmet>
                return <div id="designer"></div>;
            }

            componentDidMount() {
                // <Helmet>
                //         <title>Test</title>

                //         <link rel="stylesheet" href="stimulsoft.designer.office2013.whiteblue.css"></link>
                //         <link rel="stylesheet" href="stimulsoft.viewer.office2013.whiteblue.css"></link>

                //         <script async="true" crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
                //         <script async="true" crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
                //         <script async="true" src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.25.0/babel.min.js"></script>
                //         <script async="true" src="stimulsoft.reports.js"></script>
                //         <script async="true" src="stimulsoft.viewer.js"></script>
                //         <script async="true" src="stimulsoft.designer.js"></script>
                // </Helmet>
                
                console.log('Loading Designer view');

                console.log('Set full screen mode for the designer');
                // var options = new window.Stimulsoft.Designer.StiDesignerOptions();
                // options.appearance.fullScreenMode = true;

                console.log('Create the report designer with specified options');
                // var designer = new window.Stimulsoft.Designer.StiDesigner(options, 'StiDesigner', false);

                console.log('Create a new report instance');
                // var report = new window.Stimulsoft.Report.StiReport();

                // console.log('Load report from url');
                // report.loadFile('./reports/SimpleList.mrt');

                console.log('Edit report template in the designer');
                // designer.report = report;

                // designer.renderHtml("designer");
            }
        }

export default Designer