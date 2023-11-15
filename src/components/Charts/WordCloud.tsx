import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

interface WordCloudProps {
	words: { text: string; size: number }[];
	width: number;
	height: number;
}

const WordCloud: React.FC<WordCloudProps> = ({ words, width, height }) => {
	const svgRef = useRef<SVGSVGElement | null>(null);
	const [cloudData, setCloudData] = useState<any[]>([]);

	useEffect(() => {
		if (words.length === 0) return;

		const layout = cloud()
			.size([width, height])
			.words(words)
			.padding(5)
			.rotate(() => Math.floor(Math.random() * 2) * 90)
			.fontSize((d: any) => d.size)
			.on("end", (cloudData: any) => setCloudData(cloudData));

		layout.start();
	}, [words, width, height]);

	useEffect(() => {
		if (svgRef.current && cloudData.length > 0) {
			d3.select(svgRef.current).selectAll("*").remove();

			const colorSchemes = [
				d3.schemeBlues[9],
				d3.schemeBrBG[11],
				d3.schemeBuGn[9],
				d3.schemeBuPu[9],
				d3.schemeCategory10,
				d3.schemeDark2,
				d3.schemeGnBu[9],
				d3.schemeGreens[9],
				d3.schemeGreys[9],
				d3.schemeOranges[9],
				d3.schemeOrRd[9],
				d3.schemePastel1,
				d3.schemePastel2,
				d3.schemePiYG[11],
				d3.schemePRGn[11],
				d3.schemePuBu[9],
				d3.schemePuBuGn[9],
				d3.schemePuOr[9],
				d3.schemePuRd[9],
				d3.schemePurples[9],
				d3.schemeRdBu[11],
				d3.schemeRdGy[11],
				d3.schemeRdPu[9],
				d3.schemeRdYlBu[11],
				d3.schemeRdYlGn[11],
				d3.schemeReds[9],
				d3.schemeSpectral[11],
				d3.schemeYlGn[9],
				d3.schemeYlGnBu[9],
				d3.schemeYlOrBr[9],
				d3.schemeYlOrRd[9],
			];

			const randomColorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];

			const colorScale = d3.scaleOrdinal(randomColorScheme);

			const svg = d3.select(svgRef.current);
			const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

			g.selectAll("text")
				.data(cloudData)
				.enter()
				.append("text")
				.style("font-size", (d: any) => `${d.size}px`)
				.style("fill", (_: any, i: number) => colorScale(i.toString()))
				.attr("text-anchor", "middle")
				.attr("transform", (d: any) => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
				.text((d: any) => d.text);
		}
	}, [cloudData, width, height]);

	return <svg ref={svgRef} width={width} height={height} />;
};

export default WordCloud;
