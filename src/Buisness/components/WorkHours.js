import React, { useEffect } from 'react';
import '../../bootstrap/css/bootstrap.css';
import '../style/App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useBetween } from 'use-between';


function WorkHours() {

    const st = useSelector((state) => state.dataB);


    const dispatch = useDispatch();

    // Buisness Profile
    const { buisnessProfile, setBuisnessProfile } = useBetween(st.useSharingFilters);

    // Access Token
    const { accessToken, setAccessToken } = useBetween(st.useSharingFilters);

    // temp work schedule
    const { workSchedule, setWorkSchedule } = useBetween(st.useSharingFilters);

    // const schedules = st.workSchedule;
    // const workScheduleDetails = workSchedule;
    var scheduleForApi = [];
    const weekDays = ['SUN', "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var workScheduleDetails = workSchedule;
    let length = workSchedule.length;


    useEffect(() => {
        if (accessToken !== '') {
            const workTime = buisnessProfile.workTime;
            var dayName;
            for (var i = 0; i < 7; i++) {
                dayName = weekDays[i];
                var flag = false;
                for (var j = 0; j < workTime.length; j++) {
                    if (dayName === workTime[j].dayName) { // if shop is open in the day = dayName
                        flag = true;
                        workScheduleDetails[i].openOrclose = 'open';
                        workScheduleDetails[i].opened = 'مفتوح';
                        workScheduleDetails[i].timeMsFrom = workTime[j].openHour;
                        workScheduleDetails[i].timeMsTo = workTime[j].closeHour;

                        // OPEN
                        var hoursOpen = workTime[j].openHour / 3600000;
                        var minuOpen = (workTime[j].openHour % 3600000) / 1000;

                        // Formatting as 00:00
                        var hoursOpenString;
                        var minuOpenString;
                        if (hoursOpen >= 10) {
                            hoursOpenString = String(hoursOpen);
                        }
                        else {
                            hoursOpenString = '0' + String(hoursOpen);
                        }

                        if (minuOpen >= 10) {
                            minuOpenString = String(minuOpen);
                        }
                        else {
                            minuOpenString = '0' + String(minuOpen);
                        }

                        workScheduleDetails[i].timeFrom = (hoursOpenString) + ':' + (minuOpenString)

                        // CLOSE
                        var hoursClose = workTime[j].closeHour / 3600000;
                        var minuClose = (workTime[j].closeHour % 3600000) / 1000;

                        // Formatting as 00:00
                        var hoursCloseString;
                        var minuCloseString;
                        if (hoursClose >= 10) {
                            hoursCloseString = String(hoursClose);
                        }
                        else {
                            hoursCloseString = '0' + String(hoursClose);
                        }

                        if (minuClose >= 10) {
                            minuCloseString = String(minuClose);
                        }
                        else {
                            minuCloseString = '0' + String(minuClose);
                        }
                        workScheduleDetails[i].timeTo = (hoursCloseString) + ':' + (minuCloseString)
                        setWorkSchedule(workScheduleDetails)
                        console.log(workScheduleDetails[i].timeTo)
                        break;
                    }
                }
            }
            // console.log(workTime);
            // console.log(workScheduleDetails);
        }
    }, [workSchedule]);

    const switchState = (dayId, pickerId) => {
        // for loop for synchronization
        let i;
        let index = dayId[3]; // ex: dayId=day1 ==> dayId[3]=1
        console.log(true)
        for (i = 1; i <= 2; i++) {
            if (i === 1) {
                var temp = document.getElementById(dayId).textContent;
                document.getElementById(dayId).textContent = ((temp === 'مغلق') ? ('مفتوح') : ('مغلق'));
                workScheduleDetails[index - 1].opened = ((temp === 'مغلق') ? ('مفتوح') : ('مغلق'));
                workScheduleDetails[index - 1].openOrclose = ((temp === 'مغلق') ? ('open') : ('close'));
                // i++;
            } else {
                // dispatch({
                //     type: 'edit-schedule',
                //     state: workScheduleDetails
                // });
                setWorkSchedule(workScheduleDetails)
            }
        }
        var dayInfo = {
            day: weekDays[index - 1]
            // openHour: ,
            // closeHour:
        }
        var temp1 = document.getElementById(pickerId).style.display;
        document.getElementById(pickerId).style.display = ((temp1 === 'none') ? ('') : ('none'));
    }
    const switchToggle = (toggleId) => {
        var temp2 = document.getElementById(toggleId).defaultChecked;
        document.getElementById(toggleId).defaultChecked = ((temp2 === 'checked') ? ('') : ('checked'));
    }

    const editTime = (event, timeId, dayId, fromOrTo) => {
        let index = dayId[3];
        let timeStr = event.target.value;
        document.getElementById(timeId).value = timeStr;

        // convert to (ms) to send it to the database
        let hour = Number(timeStr[0] + timeStr[1]);
        let Minutes = Number(timeStr[3] + timeStr[4]);
        let hourInMS = hour * 3600000;
        let MinutesInMS = Minutes * 1000;

        let timeInMS = hourInMS + MinutesInMS;

        if (fromOrTo === 'from') {
            workScheduleDetails[index - 1].timeFrom = timeStr;
            workScheduleDetails[index - 1].timeMsFrom = timeInMS;
        }
        else {
            workScheduleDetails[index - 1].timeTo = timeStr;
            workScheduleDetails[index - 1].timeMsTo = timeInMS;
        }

        // dispatch({
        //             type: 'edit-schedule',
        //             state: workScheduleDetails
        //         });
        setWorkSchedule(workScheduleDetails)
    }



    const ListDays = length ? (
        workSchedule.map(schedule => {

            return (
                <div className="col" key={schedule.day}>
                    <div className="container container-work-hours" dir="auto">
                        <div className="row">
                            {/* first */}
                            <div className="col-1">
                                {schedule.day}
                            </div>
                            {/* second */}
                            <div className="col-4">
                                <label className="toggle-switch mx-2">
                                    <input type="checkbox" id={schedule.toggleId} className="checkbox-open-close" onChange={() => switchToggle(schedule.toggleId)} defaultChecked={((schedule.opened === 'مغلق') ? ('') : ('checked'))} />
                                    <span className="switch-btn" onClick={() => switchState(schedule.dayId, schedule.timePickerId)} ></span>
                                </label>
                                <span id={schedule.dayId}>{schedule.opened}</span>
                            </div>
                            {/* third */}
                            <div className="col-7" id={schedule.timePickerId} style={{ display: ((schedule.opened === 'مغلق') ? ('none') : ('')) }}>
                                <input type="time" id={schedule.timePickerFromId} placeholder="Please select Time" defaultValue={schedule.timeFrom}
                                    onChange={(event) => editTime(event, schedule.timePickerFromId, schedule.dayId, 'from')} />
                                <span className='mx-3'>إلى</span>
                                <input type="time" id={schedule.timePickerToId} placeholder="Please select Time" defaultValue={schedule.timeTo}
                                    onChange={(event) => editTime(event, schedule.timePickerToId, schedule.dayId, 'to')} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    ) : (
        <div className='empty-store'>
            error
        </div>
    )

    return (
        <div className='work-hours'>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>

            <div dir="auto">
                {ListDays}
            </div>

        </div>

    )

}
export default WorkHours;

