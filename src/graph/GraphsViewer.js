import React, {Component} from "react";
import css from "../model/reader.module.css";
import FrequencyDiagram from "./FrequencyDiagram";

export default class GraphsViewer extends Component {

    getFrequencyMap = array => {
        return array.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    }

    getFrequencyByLengthMap = array => {
        return array.reduce((acc, e) => acc.set(e.length, (acc.get(e.length) || 0) + 1), new Map());
    }

    sortByEntries = array => {
        return Array.from(array.entries())
            .sort((a, b) => b[1] - a[1]);
    }

    render() {
        const {hamWords, spamWords, hamMessagesLength, spamMessagesLength} = this.props;
        console.log(this.props);
        const hamFrequencies = this.sortByEntries(this.getFrequencyMap(hamWords));
        const spamFrequencies = this.sortByEntries(this.getFrequencyMap(spamWords));
        const hamFrequenciesByLength = this.sortByEntries(this.getFrequencyByLengthMap(hamWords));
        const spamFrequenciesByLength = this.sortByEntries(this.getFrequencyByLengthMap(spamWords));
        const hamMessagesFrequenciesByLength = this.sortByEntries(this.getFrequencyMap(hamMessagesLength));
        const spamMessagesFrequenciesByLength = this.sortByEntries(this.getFrequencyMap(spamMessagesLength));

        const topTwentyWordsByFrequency = "Top 20 words by frequency";
        const topWordsLength = "Top words length by frequency in symbols.";
        const topMessagesLength = "Top messages length by frequency in symbols.";

        return (<div className={css.fullCanvas}>
            {hamFrequencies.length > 0 &&
            <div className={css.halfCanvas}>
                <>HAM</>
                <FrequencyDiagram
                    label={topTwentyWordsByFrequency}
                    params={Array.from(hamFrequencies.slice(0, 20).map(a => a[0]))}
                    data={Array.from(hamFrequencies.slice(0, 20).map(a => a[1]))}
                />
                <FrequencyDiagram
                    label={topWordsLength}
                    params={Array.from(hamFrequenciesByLength.map(a => a[0]))}
                    data={Array.from(hamFrequenciesByLength.map(a => a[1]))}
                />
                <FrequencyDiagram
                    label={topMessagesLength}
                    params={Array.from(hamMessagesFrequenciesByLength.map(a => a[0]))}
                    data={Array.from(hamMessagesFrequenciesByLength.map(a => a[1]))}
                />
            </div>}
            {spamFrequencies.length > 0 &&
            <div className={css.halfCanvas}>
                <>SPAM</>
                <FrequencyDiagram
                    label={topTwentyWordsByFrequency}
                    params={Array.from(spamFrequencies.slice(0, 20).map(a => a[0]))}
                    data={Array.from(spamFrequencies.slice(0, 20).map(a => a[1]))}
                />
                <FrequencyDiagram
                    label={topWordsLength}
                    params={Array.from(spamFrequenciesByLength.slice(0, 20).map(a => a[0].length))}
                    data={Array.from(spamFrequenciesByLength.slice(0, 20).map(a => a[1]))}
                />
                <FrequencyDiagram
                    label={topMessagesLength}
                    params={Array.from(spamMessagesFrequenciesByLength.map(a => a[0]))}
                    data={Array.from(spamMessagesFrequenciesByLength.map(a => a[1]))}
                />
            </div>}
        </div>);
    }
}