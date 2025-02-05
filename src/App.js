import React, { useState } from 'react';

function CalculatorApp() {
  const [inputs, setInputs] = useState({
    pt0: 0, pt1: 0, pt2: 0, pt3: 0, pt4: 0,
    sta0: 0, sta1: 0, sta2: 0, sta3: 0, sta4: 0,
    staco0: 0, staco1: 0, staco2: 0, staco3: 0, staco4: 0,
    lim0: 0, lim1: 0, lim2: 0, lim3: 0,
    limco0: 0, limco1: 0, limco2: 0, limco3: 0
  });

  const [results, setResults] = useState({ sum: [0, 0, 0, 0, 0], to1000: [0, 0, 0, 0, 0], to2000: [0, 0, 0, 0, 0] });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  // 上限計算用の関数
  const calculateLimit = (sta_lim, co_lim, pt_lim, tTeampt_lim) => {
    let limlist_lim = [0, 0, 0, 0, 0];
    if (co_lim < 30 && pt_lim >= 10) {
      pt_lim -= 10;
      sta_lim += 10;
      co_lim += 1;
    } else if (co_lim < 60 && pt_lim >= 15) {
      pt_lim -= 15;
      sta_lim += 10;
      co_lim += 1;
    } else if (co_lim < 90 && pt_lim >= 20 && tTeampt_lim >= 1) {
      pt_lim -= 20;
      sta_lim += 10;
      tTeampt_lim -= 1;
      co_lim += 1;
      limlist_lim[4] = 1;
    } else if (co_lim < 120 && pt_lim >= 30 && tTeampt_lim >= 2) {
      pt_lim -= 30;
      sta_lim += 10;
      tTeampt_lim -= 2;
      co_lim += 1;
      limlist_lim[4] = 2;
    } else if (co_lim < 140 && pt_lim >= 40 && tTeampt_lim >= 3) {
      pt_lim -= 40;
      sta_lim += 10;
      tTeampt_lim -= 3;
      co_lim += 1;
      limlist_lim[4] = 3;
    }
    
    limlist_lim[0] = sta_lim;
    limlist_lim[1] = co_lim;
    limlist_lim[2] = pt_lim;
    limlist_lim[3] = tTeampt_lim;

    return limlist_lim;
  };

  const calculateResults = () => {
    let Npoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let Resultsta = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let tTeampt = parseInt(inputs.pt4);
  
    // まず現在の上限までステータス上げる
    for (let key = 0; key < 4; key++) {
      let sta = parseInt(inputs[`sta${key}`]);
      let co = parseInt(inputs[`staco${key}`]);
      let pt = parseInt(inputs[`pt${key}`]);
      while (true) {
        if (sta >= parseInt(inputs[`lim${key}`]) - 10) {
          break;
        }
        if (co < 30) {
          if (pt < 10) {
            break;
          }
          sta += 10;
          co += 1;
          pt -= 10;
        } else if (co < 60) {
          if (pt < 15) {
            break;
          }
          sta += 10;
          co += 1;
          pt -= 15;
        } else if (co < 90) {
          if (pt < 20 || tTeampt < 1) {
            break;
          }
          sta += 10;
          co += 1;
          pt -= 20;
          tTeampt -= 1;
        } else if (co < 120) {
          if (pt < 30 || tTeampt < 2) {
            break;
          }
          sta += 10;
          co += 1;
          pt -= 30;
          tTeampt -= 2;
        } else if (co < 150) {
          if (pt < 40 || tTeampt < 3) {
            break;
          }
          sta += 10;
          co += 1;
          pt -= 40;
          tTeampt -= 3;
        } else if (co < 230) {
          if (pt < 50 || tTeampt < 4) {
            break;
          }
          sta += 10;
          co += 1;
          pt -= 50;
          tTeampt -= 4;
        }
      }
      Npoints[key] = sta;
      Npoints[key + 4] = co;
      Npoints[key + 8] = pt;
    }

    // ポイント限界まで上限とステータス同時に上げる
    let limpt = 0;
    for (let key = 0; key < 4; key++) {
      let sta = parseInt(Npoints[key]);
      let co = parseInt(Npoints[key + 4]);
      let limsta = parseInt(inputs[`lim${key}`]);
      let limco = parseInt(inputs[`limco${key}`]);
      let pt = parseInt(Npoints[key + 8]);
      while (true) {
        if (co < 30) {
          if (sta > limsta) {
            sta = limsta;
            break;
          }

          if (pt < 10) {
            break;
          }
          sta += 10;
          pt -= 10;
          co += 1;

          let limlist_lim = calculateLimit(limsta, limco, pt, tTeampt);
          limsta = limlist_lim[0];
          limco = limlist_lim[1];
          pt = limlist_lim[2];
          tTeampt = limlist_lim[3];
          limpt = limlist_lim[4];
          
        } else if (co < 60) {
          if (sta > limsta) {
            sta = limsta;
            break;
          }

          if (pt < 15) {
            break;
          }
          sta += 10;
          pt -= 15;
          co += 1;

          let limlist_lim = calculateLimit(limsta, limco, pt, tTeampt);
          limsta = limlist_lim[0];
          limco = limlist_lim[1];
          pt = limlist_lim[2];
          tTeampt = limlist_lim[3];
          limpt = limlist_lim[4];
          
        } else if (co < 90) {
          if (sta > limsta) {
            sta = limsta;
            break;
          }

          if (pt < 20 || tTeampt < 1) {
            if (limsta - 10 >= sta) {
              tTeampt += limpt;
            }
            break;
          }
          sta += 10;
          pt -= 20;
          tTeampt -= 1;
          co += 1;

          let limlist_lim = calculateLimit(limsta, limco, pt, tTeampt);
          limsta = limlist_lim[0];
          limco = limlist_lim[1];
          pt = limlist_lim[2];
          tTeampt = limlist_lim[3];
          limpt = limlist_lim[4];
          
        } else if (co < 120) {
          if (sta > limsta) {
            sta = limsta;
            break;
          }

          if (pt < 30 || tTeampt < 2) {
            if (limsta - 10 >= sta) {
              tTeampt += limpt;
            }
            break;
          }
          sta += 10;
          pt -= 30;
          tTeampt -= 2;
          co += 1;

          let limlist_lim = calculateLimit(limsta, limco, pt, tTeampt);
          limsta = limlist_lim[0];
          limco = limlist_lim[1];
          pt = limlist_lim[2];
          tTeampt = limlist_lim[3];
          limpt = limlist_lim[4];
          
        } else if (co < 150) {
          if (sta > limsta) {
            sta = limsta;
            break;
          }

          if (pt < 40 || tTeampt < 3) {
            if (limsta - 10 >= sta) {
              tTeampt += limpt;
            }
            break;
          }
          sta += 10;
          pt -= 40;
          tTeampt -= 3;
          co += 1;

          let limlist_lim = calculateLimit(limsta, limco, pt, tTeampt);
          limsta = limlist_lim[0];
          limco = limlist_lim[1];
          pt = limlist_lim[2];
          tTeampt = limlist_lim[3];
          limpt = limlist_lim[4];
          
        } else if (co < 230) {
          if (sta > limsta) {
            sta = limsta;
            break;
          }

          if (pt < 50 || tTeampt < 4) {
            if (limsta - 10 >= sta) {
              tTeampt += limpt;
            }
            break;
          }
          sta += 10;
          pt -= 50;
          tTeampt -= 4;
          co += 1;

          let limlist_lim = calculateLimit(limsta, limco, pt, tTeampt);
          limsta = limlist_lim[0];
          limco = limlist_lim[1];
          pt = limlist_lim[2];
          tTeampt = limlist_lim[3];
          limpt = limlist_lim[4];
          
        }else {
          tTeampt += limpt;
          break;
        }
      }
      
      Resultsta[key] = sta;
      Resultsta[key + 4] = co;
      Resultsta[key + 8] = limsta;
      Resultsta[key + 12] = limco;
      Resultsta[key + 16] = pt;
    }
    Resultsta[20] = tTeampt;

    let maxTeam = parseInt(inputs[`sta4`]) + Math.trunc(tTeampt / 30) * 10;

    let sums = Resultsta.slice(0, 5);
    sums[4] = maxTeam;

    // 各ステータス1000まで何pt必用か計算したい
    let tTeamptto = parseInt(inputs.pt4);
    let to1000s = [0, 0, 0, 0, 0];
    for (let key = 0; key < 4; key++) {
      let sta = parseInt(inputs[`sta${key}`]);
      let co = parseInt(inputs[`staco${key}`]);
      let pt = parseInt(inputs[`pt${key}`]);
      let limsta = parseInt(inputs[`lim${key}`]);
      let limco = parseInt(inputs[`limco${key}`]);
      let tTeampt = parseInt(inputs.pt4);

      if (limsta < 1000) {
        let bias = 999 - limsta;
        let trunc = Math.trunc(bias / 10) + 1;
        for (let j = 0; j < trunc; j++) {
          if (limco + j < 30) {
            to1000s[key] += 10;
          }else if (limco + j < 60) {
            to1000s[key] += 15;
          }else if (limco + j < 90) {
            to1000s[key] += 20;
            to1000s[4] += 1;
          }else if (limco + j < 120) {
            to1000s[key] += 30;
            to1000s[4] += 2;
          }else if (limco + j < 140) {
            to1000s[key] += 40;
            to1000s[4] += 3;
          }
        }
      }
      if (sta < 1000) {
        let bias = 999 - sta;
        let trunc = Math.trunc(bias / 10) + 1;
        for (let j = 0; j < trunc; j++) {
          if (co + j < 30) {
            to1000s[key] += 10;
          }else if (co + j < 60) {
            to1000s[key] += 15;
          }else if (co + j < 90) {
            to1000s[key] += 20;
            to1000s[4] += 1;
          }else if (co + j < 120) {
            to1000s[key] += 30;
            to1000s[4] += 2;
          }else if (co + j < 150) {
            to1000s[key] += 40;
            to1000s[4] += 3;
          }else if (co + j < 230) {
            to1000s[key] += 50;
            to1000s[4] += 4;
          }
        }
      }
      if (pt < to1000s[key]) {
        to1000s[key] = to1000s[key] - pt;
      }else {
        to1000s[key] = 0;
      }



    }
    if (tTeamptto < to1000s[4]) {
      to1000s[4] = to1000s[4] - tTeamptto;
    }else {
      to1000s[4] = 0;
    }

    // 各ステータス2000まで何pt必用か計算したい
    let to2000s = [0, 0, 0, 0, 0];
    for (let key = 0; key < 4; key++) {
      let sta = parseInt(inputs[`sta${key}`]);
      let co = parseInt(inputs[`staco${key}`]);
      let pt = parseInt(inputs[`pt${key}`]);
      let limsta = parseInt(inputs[`lim${key}`]);
      let limco = parseInt(inputs[`limco${key}`]);

      let biaslim = 1999 - limsta;
      let trunclim = Math.trunc(biaslim / 10) + 1;
      if (limsta < 2000) {
        for (let j = 0; j < trunclim; j++) {
          if (limco + j < 30) {
            to2000s[key] += 10;
          }else if (limco + j < 60) {
            to2000s[key] += 15;
          }else if (limco + j < 90) {
            to2000s[key] += 20;
            to2000s[4] += 1;
          }else if (limco + j < 120) {
            to2000s[key] += 30;
            to2000s[4] += 2;
          }else if (limco + j < 140) {
            to2000s[key] += 40;
            to2000s[4] += 3;
          }
        }
      }
      if (sta < 2000) {
        let bias = 1999 - sta;
        let trunc = Math.trunc(bias / 10) + 1;
        for (let j = 0; j < trunc; j++) {
          if (co + j < 30) {
            to2000s[key] += 10;
          }else if (co + j < 60) {
            to2000s[key] += 15;
          }else if (co + j < 90) {
            to2000s[key] += 20;
            to2000s[4] += 1;
          }else if (co + j < 120) {
            to2000s[key] += 30;
            to2000s[4] += 2;
          }else if (co + j < 150) {
            to2000s[key] += 40;
            to2000s[4] += 3;
          }else if (co + j < 230) {
            to2000s[key] += 50;
            to2000s[4] += 4;
          }
        }
      }
      if (pt < to2000s[key]) {
        to2000s[key] = to2000s[key] - pt;
      }else {
        to2000s[key] = 0;
      }
      
      if (limco + trunclim > 140 && Resultsta[key + 8] < 2000) {
        to2000s[key] = "不可";
      }
    }
    if (tTeamptto < to2000s[4]) {
      to2000s[4] = to2000s[4] - tTeamptto;
    }else {
      to2000s[4] = 0;
    }

    setResults({ sum: sums, to1000: to1000s, to2000: to2000s });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' , marginRight: '90px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* 各行のラベル */}
          <span style={{ display: 'block', width: '100%', textAlign: 'right', height: '60px', lineHeight: '80px' }}>所持ポイント</span>
        </div>
        {[0, 1, 2, 3, 4].map((num) => (
          <div key={`input-${num}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ margin: '0px' }}>{num === 0 ? '歌唱力' : num === 1 ? '安定感' : num === 2 ? '表現力' : num === 3 ? '集中力' : '団結力'}</h4>
            <input
              style={{ margin: '15px', backgroundColor: num === 0 ? '#ffb6c1' : num === 1 ? '#b0c4de' : num === 2 ? '#ffff00' : num === 3 ? '#da70d6' : '#ffa500', padding: '8px', width: '60px', textAlign: 'center' }}
              type="number"
              name={`pt${num}`}
              value={inputs[`pt${num}`]}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px', marginRight: '90px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {/* 各行のラベル */}
          <span style={{ display: 'block', width: '100%', textAlign: 'right', height: '60px', lineHeight: '80px' }}>ステータス</span>
          <span style={{ display: 'block', width: '100%', textAlign: 'right', height: '60px', lineHeight: '60px' }}>割り振り回数</span>
        </div>
        {[0, 1, 2, 3, 4].map((num) => (
          <div key={`input-${num}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ margin: '3px' }}>{num === 0 ? 'Vocal' : num === 1 ? 'Dance' : num === 2 ? 'Visual' : num === 3 ? 'Mental' : 'SP'}</h4>
            <input
              style={{ margin: '0px 15px 0px 15px', backgroundColor: num === 0 ? '#ffb6c1' : num === 1 ? '#b0c4de' : num === 2 ? '#ffff00' : num === 3 ? '#da70d6' : '#ffa500', padding: '8px', width: '60px', textAlign: 'center' }}
              type="number"
              name={`sta${num}`}
              value={inputs[`sta${num}`]}
              onChange={handleInputChange}
            />
            <input
              style={{ margin: '15px', backgroundColor: num === 0 ? '#ffb6c1' : num === 1 ? '#b0c4de' : num === 2 ? '#ffff00' : num === 3 ? '#da70d6' : '#ffa500', padding: '8px', width: '60px', textAlign: 'center' }}
              type="number"
              name={`staco${num}`}
              value={inputs[`staco${num}`]}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' , marginRight: '100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {/* 各行のラベル */}
          <span style={{ display: 'block', width: '100%', textAlign: 'right', height: '60px', lineHeight: '55px' }}>上限</span>
          <span style={{ display: 'block', width: '100%', textAlign: 'right', height: '60px', lineHeight: '35px' }}>割り振り回数</span>
        </div>
        {[0, 1, 2, 3].map((num) => (
          <div key={`input-${num}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
              style={{ margin: '0px 15px 0px 15px', backgroundColor: num === 0 ? '#ffb6c1' : num === 1 ? '#b0c4de' : num === 2 ? '#ffff00' : num === 3 ? '#da70d6' : '#ffa500', padding: '8px', width: '60px', textAlign: 'center' }}
              type="number"
              name={`lim${num}`}
              value={inputs[`lim${num}`]}
              onChange={handleInputChange}
            />
            <input
              style={{ margin: '15px', backgroundColor: num === 0 ? '#ffb6c1' : num === 1 ? '#b0c4de' : num === 2 ? '#ffff00' : num === 3 ? '#da70d6' : '#ffa500', padding: '8px', width: '60px', textAlign: 'center' }}
              type="number"
              name={`limco${num}`}
              value={inputs[`limco${num}`]}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <button onClick={calculateResults} style={{ height: '50px', width: '80px' , marginLeft: '20px' }}>計算</button>
      </div>
      <hr style={{ color: '#ccc', backgroundColor: '#ccc', height: '2px', border: 'none' }} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' , marginRight: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <span style={{ display: 'block', width: '100%', textAlign: 'right', height: '60px', lineHeight: '80px' }}>結果</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {[0, 1, 2, 3, 4].map((num, index) => (
            <div key={`sum-${index}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h4 style={{ margin: '0px' }}>{num === 0 ? 'Vocal' : num === 1 ? 'Dance' : num === 2 ? 'Visual' : num === 3 ? 'Mental' : 'SP'}</h4>
              <div key={`sum-${index}`} style={{ margin: '15px', backgroundColor: num === 0 ? '#ffb6c1' : num === 1 ? '#b0c4de' : num === 2 ? '#ffff00' : num === 3 ? '#da70d6' : '#ffa500', padding: '8px', width: '65px', textAlign: 'center' }}>
                <span>{results.sum[index]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' , marginRight: '75px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <span style={{ display: 'block', width: '100%', textAlign: 'right', height: '50px', lineHeight: '60px' }}>1000まであと</span>
          <span style={{ display: 'block', width: '100%', textAlign: 'right', height: '50px', lineHeight: '60px' }}>2000まであと</span>
        </div>
        <div style={{ display: 'flex', marginRight: '10px' }}>
          {[0, 1, 2, 3, 4].map((num, index) => (
            <div key={`to1000-${index}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h4 style={{ margin: '0px' }}>{num === 0 ? '歌唱力' : num === 1 ? '安定感' : num === 2 ? '表現力' : num === 3 ? '集中力' : '団結力'}</h4>
              <div key={`to1000-${index}`} style={{ margin: '0px 15px 0px 15px', backgroundColor: num === 0 ? '#ffb6c1' : num === 1 ? '#b0c4de' : num === 2 ? '#ffff00' : num === 3 ? '#da70d6' : '#ffa500', padding: '8px', width: '65px', textAlign: 'center' }}>
                <span>{results.to1000[index]}</span>
              </div>
              <div key={`to2000-${index}`} style={{ margin: '15px', backgroundColor: num === 0 ? '#ffb6c1' : num === 1 ? '#b0c4de' : num === 2 ? '#ffff00' : num === 3 ? '#da70d6' : '#ffa500', padding: '8px', width: '65px', textAlign: 'center' }}>
                <span>{results.to2000[index]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalculatorApp;
