import { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { svg, timeYears } from 'd3';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useBetween } from 'use-between';

function BarChart(props) {
    const state = useSelector((state) => state.data);
    /// --------------------drowpDown--------------------------------
    // rate1.scss

    const [dropdownOpen, setdropdownOpen] = useState(false);
    let initYear = new Date().getFullYear();
    const [currentYear, setCurrentYear] = useState(0);

    const [currentYear1, setCurrentYear1] = useState(initYear);
    const { idStore, setidStore, rateBusi, setRateBusi } = useBetween(state.useShareState);


    function toggle() {

        setdropdownOpen(!dropdownOpen);
    }

    var rateOfFollower = rateBusi.followPerYear;
    const dropdownitemB = rateOfFollower.length ? (
        rateOfFollower.map((item, i) => {

            return (
                <div key={item.year}>
                    <DropdownItem className='menu-item1' onClick={() => selectYear(i, item.year)} >
                        <span className='prodType'>{item.year}</span>
                    </DropdownItem>

                </div>
            )
        })
    ) : (<p className='NoProd'> </p>);

    //-----------------------end drowpDown----------------------------


    //---------------------------d3----------------------------------

    const [year, setYear] = useState(0);

    const [data, setData] = useState(rateOfFollower[0].followPerMonth);

    const [month, setmonth] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]);

    const svgRef = useRef();

    var colorRange = ['#66c770', '#7cd184', '#C0F17A'];
    var color = d3.scaleLinear().range(colorRange).domain([1, 2, 3]);
    const w = props.w;
    const h = props.h;
    useEffect(() => {

        //setting up svg container


        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')
            .style('margin-top', props.svgMt)
            .style('margin-right', props.svgMr)
        setYear(1);


    }, [])


    useEffect(() => {

        d3.select(svgRef.current).selectAll('rect').data(data).remove();

        //  d3.select(svgRef.current).selectAll('g').remove();
        draw();
    }, [data, year])
    useEffect(() => {

        setRateBusi(rateBusi)
    }, [rateBusi])

    function draw() {
        // setting up scaling
        const svg = d3.select(svgRef.current);


        const xScale = d3.scaleBand()
            .domain(month.map((m) => m))
            .range([0, w])
            .padding(props.paddongXscale)





        // .style('font-size', '12px');
        const xScale1 = d3.scaleBand()
            .domain(data.map((val, i) => i))
            .range([0, w])
            .padding(0.2)






        var yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([h, 0])



        //setting up axes
        const xAxis = d3.axisBottom(xScale)
            .ticks(data.length)



        // const yAxis = d3.axisLeft(yScale)
        // .ticks(5);
        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0,${h})`)
            .style('font-size', props.XAxisFontS)


        //  svg.append('g')
        //     .call(yAxis)

        //svg linearGradient
        var linearGradient = svg.append("defs")
            .append("linearGradient")
            .attr("id", "linear-gradient");


        linearGradient.append("stop")
            .attr("offset", "25%")
            .attr("stop-color", color(1));

        linearGradient.append("stop")
            .attr("offset", "50%")
            .attr("stop-color", color(2))
        linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", color(3));
        //setting the svg data

        svg.selectAll('text')
            .data(data)
            .text((d) => d + '%')
            .attr('y', (d, i) => yScale(d) - props.textMt)
            .style('fill', props.colorText)
            .style('font-size', props.textFontS);




        svg.selectAll('.bar')
            .enter()
            .data(data)
            .join('rect')
            .attr('x', (v, i) => xScale1(i))
            .attr('y', yScale)
            .attr('width', xScale.bandwidth())
            .attr('height', val => h - yScale(val))
            .style("fill", "url(#linear-gradient)")
            .transition()
            .delay(1000)
            .ease(d3.easeLinear);







    }

    const selectYear = (i, year) => {

        setCurrentYear1(year);

        setData(
            rateOfFollower[i].followPerMonth


        )

    }
    // --------------------------------end d3-------------------------------
    const display = props.display;


    return (

        <div className='chartCont'>
            <div className='FollowerNum'><bdi>عدد المتابعين:</bdi>
                <h5>{rateBusi.followerCount}</h5>
            </div>

            <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                <DropdownToggle caret className='dropDown1'>

                    <span > {currentYear1}</span>

                </DropdownToggle>
                <DropdownMenu className='yearMenu1' >

                    {dropdownitemB};

                </DropdownMenu>
            </Dropdown>

            <svg ref={svgRef} ></svg>

        </div>
    )
}
export default BarChart;