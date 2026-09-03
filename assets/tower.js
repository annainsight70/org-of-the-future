// Compiled from tower.jsx (Babel standalone, presets: react + typescript).
// Isometric tower scene — direct port of the original bundle's generator code.
const q = (x, y, z = 0) => [(x - y) * 34, (x + y) * 17 - z * 30];
const pts = a => a.map(p => p.join(',')).join(' ');
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16),
    c = v => Math.max(0, Math.min(255, Math.round(v)));
  const r = c((n >> 16 & 255) * f),
    g = c((n >> 8 & 255) * f),
    b = c((n & 255) * f);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}
function prism(x, y, w, d, h, z = 0) {
  const t = z + h;
  return {
    top: pts([q(x, y, t), q(x + w, y, t), q(x + w, y + d, t), q(x, y + d, t)]),
    left: pts([q(x, y + d, t), q(x + w, y + d, t), q(x + w, y + d, z), q(x, y + d, z)]),
    right: pts([q(x + w, y, t), q(x + w, y + d, t), q(x + w, y + d, z), q(x + w, y, z)])
  };
}
const flat = (x, y, w, d, z = 0) => pts([q(x, y, z), q(x + w, y, z), q(x + w, y + d, z), q(x, y + d, z)]);
const FLOOR_GAP = 2.75,
  SLAB = 0.16,
  PODIUM = 2.7,
  TOP = 28.45;
const levelZ = l => PODIUM + l * FLOOR_GAP;
const anchor = l => q(7, 0, levelZ(l) + FLOOR_GAP * 0.5);
const BGS = [{
  x: -4.8,
  y: -1.8,
  w: 3.2,
  d: 3.2,
  h: 19.5,
  c: '#E7E7EE'
}, {
  x: -4.2,
  y: 3.4,
  w: 2.9,
  d: 2.9,
  h: 12.5,
  c: '#EDEDF2'
}];
const BU = Math.min(-238, ...BGS.map(b => q(b.x, b.y + b.d)[0]));
const VIEWBOX = {
  x: BU - 44,
  y: -(TOP * 30 + 58),
  w: -(BU - 44) + 238 + 246,
  h: TOP * 30 + 58 + 238 + 52
};
const P = {
  slab: '#E7E5EA',
  slabTop: '#F4F3F6',
  floor: '#EAE8EF',
  wall: '#F6F5F9',
  wallSide: '#E9E7EE',
  core: '#E2DFE6',
  deskTop: '#FFFFFF',
  deskLeg: '#C4C1CB',
  screen: '#26262F',
  chair: '#6C6C7A',
  rack: '#33333D',
  wood: '#D8CFC4',
  sofa: '#B9BCC9',
  spandrel: '#EAE8ED',
  mullion: '#C6C9D2',
  podium: '#E4E2E7'
};
const PERSON = ['#6E2585', '#3667D9', '#C0008D', '#43434C', '#4C7BC4', '#8A5AA8'];
const SKIN = ['#D8B094', '#A97B58', '#EBC8AC', '#8A5F42', '#C79C7C'];
function Box(k, p, color) {
  return /*#__PURE__*/React.createElement("g", {
    key: k
  }, /*#__PURE__*/React.createElement("polygon", {
    points: p.left,
    fill: shade(color, 0.84)
  }), /*#__PURE__*/React.createElement("polygon", {
    points: p.right,
    fill: shade(color, 0.93)
  }), /*#__PURE__*/React.createElement("polygon", {
    points: p.top,
    fill: color
  }));
}
function person(k, x, y, z, ci) {
  const body = PERSON[ci % PERSON.length],
    skin = SKIN[ci * 3 % SKIN.length];
  const head = q(x + 0.2, y + 0.16, z + 1.05 + 0.17),
    sh = q(x + 0.2, y + 0.16, z);
  return {
    k,
    sort: x + 0.2 + y + 0.16,
    el: /*#__PURE__*/React.createElement("g", {
      key: k
    }, /*#__PURE__*/React.createElement("ellipse", {
      cx: sh[0],
      cy: sh[1],
      rx: 12,
      ry: 6,
      fill: "#000",
      opacity: 0.1
    }), Box(k + 'l', prism(x + 0.1, y + 0.07, 0.22, 0.2, 0.5, z), '#3B3B46'), Box(k + 't', prism(x, y, 0.4, 0.32, 0.55, z + 0.5), body), /*#__PURE__*/React.createElement("circle", {
      cx: head[0],
      cy: head[1],
      r: 5.6,
      fill: skin
    }))
  };
}
function monitor(k, x, y, w, d, z) {
  const o = Math.min(0.78, w - 0.35);
  return /*#__PURE__*/React.createElement("g", {
    key: k + 'm'
  }, Box(k + 'ms', prism(x + w / 2 - o / 2, y + d * 0.2, o, 0.06, 0.44, z), P.screen), Box(k + 'mk', prism(x + w / 2 - 0.3, y + d * 0.58, 0.6, 0.22, 0.03, z), '#DCDAE1'));
}
function desk(k, x, y, w, d, z, mon) {
  const t = z + 0.55;
  return {
    k,
    sort: x + w / 2 + y + d / 2,
    el: /*#__PURE__*/React.createElement("g", {
      key: k
    }, Box(k + 'a', prism(x + 0.05, y + 0.06, 0.08, d - 0.12, 0.55, z), P.deskLeg), Box(k + 'b', prism(x + w - 0.13, y + 0.06, 0.08, d - 0.12, 0.55, z), P.deskLeg), Box(k + 't', prism(x, y, w, d, 0.06, t), P.deskTop), mon ? monitor(k, x, y, w, d, t + 0.06) : null)
  };
}
function chair(k, x, y, z) {
  return {
    k,
    sort: x + 0.19 + y + 0.19,
    el: /*#__PURE__*/React.createElement("g", {
      key: k
    }, Box(k + 'p', prism(x + 0.14, y + 0.14, 0.1, 0.1, 0.32, z), '#9A9AA6'), Box(k + 's', prism(x, y, 0.38, 0.38, 0.07, z + 0.32), P.chair), Box(k + 'b', prism(x, y + 0.31, 0.38, 0.07, 0.44, z + 0.39), shade(P.chair, 0.9)))
  };
}
function rack(k, x, y, z) {
  const lights = [];
  for (let i = 0; i < 10; i++) {
    const p = q(x + 0.6, y + 0.18, z + 0.2 + i * 0.16);
    lights.push(/*#__PURE__*/React.createElement("rect", {
      key: i,
      x: p[0] - 17,
      y: p[1] - 3,
      width: 15,
      height: 2.6,
      fill: i % 3 === 0 ? '#43CFEA' : '#7BE0B0',
      opacity: 0.9
    }));
  }
  return {
    k,
    sort: x + 0.3 + y + 0.5,
    el: /*#__PURE__*/React.createElement("g", {
      key: k
    }, Box(k + 'b', prism(x, y, 0.6, 1, 1.9, z), P.rack), /*#__PURE__*/React.createElement("g", null, lights))
  };
}
function bookshelf(k, x, y, z) {
  const books = [];
  for (let a = 0; a < 4; a++) for (let o = 0; o < 7; o++) {
    const bx = x + 0.1 + o * 0.14;
    books.push(Box('bk' + k + a + o, prism(bx, y + 0.12, 0.1, 0.3, 0.28, z + 0.16 + a * 0.44), ['#B36A8E', '#8C7FB8', '#7E93C4', '#A88F7A'][(o + a) % 4]));
  }
  return {
    k,
    sort: x + 0.55 + y + 0.24,
    el: /*#__PURE__*/React.createElement("g", {
      key: k
    }, Box(k + 'c', prism(x, y, 1.1, 0.48, 1.9, z), P.wood), /*#__PURE__*/React.createElement("g", null, books))
  };
}
function table(k, x, y, w, d, z) {
  return {
    k,
    sort: x + w / 2 + y + d / 2,
    el: /*#__PURE__*/React.createElement("g", {
      key: k
    }, Box(k + 'p', prism(x + w / 2 - 0.2, y + d / 2 - 0.2, 0.4, 0.4, 0.56, z), '#A5A2AC'), Box(k + 't', prism(x, y, w, d, 0.07, z + 0.56), P.deskTop))
  };
}
function sofa(k, x, y, z) {
  return {
    k,
    sort: x + 0.75 + y + 0.38,
    el: /*#__PURE__*/React.createElement("g", {
      key: k
    }, Box(k + 's', prism(x, y, 1.5, 0.76, 0.42, z), P.sofa), Box(k + 'b', prism(x, y, 1.5, 0.2, 0.4, z + 0.42), shade(P.sofa, 0.93)))
  };
}
function plant(k, x, y, z) {
  const a = q(x, y, z + 0.38),
    b = q(x, y, z + 0.86);
  return {
    k,
    sort: x + y,
    el: /*#__PURE__*/React.createElement("g", {
      key: k
    }, Box(k + 'p', prism(x - 0.2, y - 0.2, 0.4, 0.4, 0.38, z), '#CFCBD4'), /*#__PURE__*/React.createElement("ellipse", {
      cx: b[0],
      cy: b[1] - 5,
      rx: 16,
      ry: 13,
      fill: "#5E8F62",
      opacity: 0.92
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: a[0] - 9,
      cy: a[1] - 12,
      rx: 11,
      ry: 9,
      fill: "#6FA372",
      opacity: 0.92
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: a[0] + 10,
      cy: a[1] - 15,
      rx: 10,
      ry: 8.5,
      fill: "#4F7D55",
      opacity: 0.92
    }))
  };
}
const wallScreen = (k, x, z, w) => Box(k, prism(x, 0.16, w, 0.07, 0.8, z + 0.95), P.screen);
function bigScreen(k, x, y, z) {
  return {
    k,
    sort: x + 0.5 + y + 0.06,
    el: /*#__PURE__*/React.createElement("g", {
      key: k
    }, Box(k + 'f', prism(x, y, 1.4, 0.1, 1.5, z), '#E0DEE5'), Box(k + 's', prism(x + 0.14, y - 0.06, 1.12, 0.07, 0.72, z + 0.55), P.screen))
  };
}
function furnish(id, z) {
  const back = [],
    items = [];
  let pi = 0;
  const a = (x, y, c) => items.push(person(`${id}p${pi++}`, x, y, z, c));
  switch (id) {
    case 'exec':
      back.push(wallScreen('exs', 3.2, z, 2.6));
      items.push(table('ext', 3, 3.3, 3.2, 1.7, z));
      [0, 1, 2].forEach(i => items.push(chair(`exc${i}`, 3.2 + i * 1, 2.75, z)));
      [0, 1, 2].forEach(i => items.push(chair(`exd${i}`, 3.2 + i * 1, 5.1, z)));
      a(3.3, 5.35, 1);
      a(4.4, 2.35, 3);
      a(5.5, 5.35, 5);
      items.push(sofa('exso', 0.5, 5.3, z));
      a(1.1, 4.6, 2);
      items.push(plant('exp', 6.4, 1.2, z));
      break;
    case 'sec':
      back.push(wallScreen('s1', 2.6, z, 1.9));
      back.push(wallScreen('s2', 4.8, z, 1.9));
      items.push(desk('sd1', 2.5, 1.1, 2.2, 0.9, z, true));
      items.push(desk('sd2', 4.9, 1.1, 1.7, 0.9, z, true));
      items.push(desk('sd3', 2.6, 3.6, 2.4, 0.9, z, true));
      items.push(bigScreen('sb', 0.5, 4.4, z));
      a(3.1, 2.2, 0);
      a(5.4, 2.2, 4);
      a(3.4, 4.7, 2);
      a(1.2, 5.6, 5);
      items.push(plant('sp', 6.4, 5.9, z));
      break;
    case 'it':
      items.push(rack('r1', 5.5, 0.5, z));
      items.push(rack('r2', 5.5, 1.7, z));
      items.push(rack('r3', 5.5, 2.9, z));
      items.push(desk('id1', 2.6, 1.2, 2.2, 0.9, z, true));
      items.push(desk('id2', 2.6, 3.4, 2.2, 0.9, z, true));
      items.push(desk('id3', 1, 5.4, 2.4, 0.9, z, true));
      a(3.2, 2.3, 2);
      a(3.4, 4.5, 5);
      a(1.6, 6.5, 0);
      a(5, 5.6, 3);
      items.push(plant('ip', 6.4, 6.3, z));
      break;
    case 'fin':
      back.push(wallScreen('f1', 4.4, z, 2.2));
      items.push(desk('fd1', 4.2, 1, 2.4, 0.9, z, true));
      items.push(desk('fd2', 2.6, 3.3, 2.4, 0.9, z, true));
      items.push(desk('fd3', 2.6, 5.3, 2.4, 0.9, z, true));
      a(4.8, 2.1, 3);
      a(3.2, 4.4, 1);
      a(3.2, 6.4, 4);
      items.push(table('ft', 5.4, 4.3, 1.2, 1.9, z));
      a(6.2, 5, 0);
      items.push(plant('fp', 0.6, 5.9, z));
      break;
    case 'sales':
      items.push(desk('sa1', 2.6, 1, 1.9, 0.9, z, true));
      items.push(desk('sa2', 4.8, 1, 1.8, 0.9, z, true));
      items.push(desk('sa3', 2.6, 3.4, 1.9, 0.9, z, true));
      items.push(desk('sa4', 4.8, 3.4, 1.8, 0.9, z, true));
      items.push(sofa('sas', 0.6, 5.4, z));
      a(3.1, 2.1, 2);
      a(5.3, 2.1, 5);
      a(3.1, 4.5, 0);
      a(5.3, 4.5, 3);
      a(2.6, 6.4, 1);
      items.push(plant('sap', 6.4, 6.3, z));
      break;
    case 'ops':
      back.push(wallScreen('o1', 2.5, z, 2.2));
      back.push(wallScreen('o2', 5, z, 1.6));
      items.push(desk('od1', 2.5, 1.3, 4.1, 1, z, true));
      items.push(desk('od2', 2.9, 3.8, 2.8, 1, z, true));
      items.push(bigScreen('ob', 0.4, 5.2, z));
      a(3.1, 2.5, 1);
      a(4.5, 2.5, 4);
      a(5.9, 2.5, 0);
      a(3.6, 5, 5);
      a(1.3, 6.3, 2);
      items.push(plant('op', 6.4, 6.4, z));
      break;
    case 'legal':
      items.push(bookshelf('l1', 2.6, 0.3, z));
      items.push(bookshelf('l2', 3.9, 0.3, z));
      items.push(bookshelf('l3', 5.2, 0.3, z));
      items.push(desk('ld1', 4.4, 2.6, 2.2, 0.9, z, true));
      items.push(table('lt', 2.5, 4.6, 2.4, 1.5, z));
      [0, 1].forEach(i => items.push(chair(`lc${i}`, 2.8 + i * 1.2, 4.05, z)));
      a(5, 3.7, 3);
      a(2.9, 6.3, 0);
      a(4.1, 6.3, 2);
      a(0.8, 5.5, 5);
      items.push(plant('lp', 6.4, 6.3, z));
      break;
    default:
      items.push(sofa('h1', 2.6, 1, z));
      items.push(sofa('h2', 5, 1, z));
      items.push(table('ht', 3.2, 3.2, 2, 1.3, z));
      [0, 1].forEach(i => items.push(chair(`hc${i}`, 3.5 + i * 1.1, 2.65, z)));
      items.push(desk('hd1', 4.6, 5.2, 2, 0.9, z, true));
      items.push(bigScreen('hb', 0.5, 4.6, z));
      a(3.4, 4.7, 4);
      a(4.6, 4.7, 1);
      a(5.6, 2, 5);
      a(5.1, 6.3, 2);
      a(1.3, 5.9, 0);
      items.push(plant('hp1', 6.4, 3.4, z));
      items.push(plant('hp2', 1, 6.5, z));
  }
  return {
    back,
    items
  };
}
function Floor({
  dep,
  active,
  dim,
  onPick
}) {
  const z = levelZ(dep.level),
    gz = z + SLAB,
    gh = 2.59;
  const {
    back,
    items
  } = furnish(dep.id, gz);
  items.sort((a, b) => a.sort - b.sort);
  const slab = prism(0, 0, 7, 7, SLAB, z);
  const glass = prism(0, 0, 7, 7, gh, gz);
  const wallL = prism(0, 0, 7, 0.12, gh, gz);
  const wallR = prism(0, 0, 0.12, 7, gh, gz);
  const mull = [];
  for (let i = 1; i < 7; i++) {
    const t = i / 7 * 7;
    mull.push(/*#__PURE__*/React.createElement("line", {
      key: 'a' + i,
      x1: q(t, 7, gz)[0],
      y1: q(t, 7, gz)[1],
      x2: q(t, 7, gz + gh)[0],
      y2: q(t, 7, gz + gh)[1],
      stroke: P.mullion,
      strokeWidth: 1.6
    }));
    mull.push(/*#__PURE__*/React.createElement("line", {
      key: 'b' + i,
      x1: q(7, t, gz)[0],
      y1: q(7, t, gz)[1],
      x2: q(7, t, gz + gh)[0],
      y2: q(7, t, gz + gh)[1],
      stroke: P.mullion,
      strokeWidth: 1.6
    }));
  }
  const m = gz + gh * 0.62;
  mull.push(/*#__PURE__*/React.createElement("line", {
    key: "ta",
    x1: q(0, 7, m)[0],
    y1: q(0, 7, m)[1],
    x2: q(7, 7, m)[0],
    y2: q(7, 7, m)[1],
    stroke: P.mullion,
    strokeWidth: 1.4
  }), /*#__PURE__*/React.createElement("line", {
    key: "tb",
    x1: q(7, 0, m)[0],
    y1: q(7, 0, m)[1],
    x2: q(7, 7, m)[0],
    y2: q(7, 7, m)[1],
    stroke: P.mullion,
    strokeWidth: 1.4
  }));
  return /*#__PURE__*/React.createElement("g", {
    className: 'floor' + (active ? ' on' : '') + (dim ? ' off' : ''),
    onClick: () => onPick(dep.id),
    role: "button",
    tabIndex: 0,
    "aria-label": dep.name,
    onKeyDown: e => (e.key === 'Enter' || e.key === ' ') && onPick(dep.id)
  }, /*#__PURE__*/React.createElement("polygon", {
    points: slab.left,
    fill: shade(P.slab, 0.9)
  }), /*#__PURE__*/React.createElement("polygon", {
    points: slab.right,
    fill: P.slab
  }), /*#__PURE__*/React.createElement("polygon", {
    points: slab.top,
    fill: P.slabTop
  }), /*#__PURE__*/React.createElement("g", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: flat(0, 0, 7, 7, gz),
    fill: P.floor
  }), /*#__PURE__*/React.createElement("polygon", {
    points: wallL.left,
    fill: P.wall
  }), /*#__PURE__*/React.createElement("polygon", {
    points: wallR.right,
    fill: P.wallSide
  }), Box('core', prism(0.2, 0.2, 2, 2, gh, gz), P.core), back, items.map(i => i.el)), /*#__PURE__*/React.createElement("g", {
    className: "glass"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: glass.left,
    fill: "url(#gGlassL)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: glass.right,
    fill: "url(#gGlassR)"
  }), /*#__PURE__*/React.createElement("polygon", {
    className: "frost",
    points: glass.left,
    fill: "#FFFFFF"
  }), /*#__PURE__*/React.createElement("polygon", {
    className: "frost",
    points: glass.right,
    fill: "#FFFFFF"
  }), mull, /*#__PURE__*/React.createElement("polygon", {
    points: glass.left,
    fill: "none",
    stroke: P.mullion,
    strokeWidth: 1.6
  }), /*#__PURE__*/React.createElement("polygon", {
    points: glass.right,
    fill: "none",
    stroke: P.mullion,
    strokeWidth: 1.6
  }), /*#__PURE__*/React.createElement("polygon", {
    className: "sel",
    points: glass.left,
    fill: "none",
    stroke: "#C0008D",
    strokeWidth: 2.4
  }), /*#__PURE__*/React.createElement("polygon", {
    className: "sel",
    points: glass.right,
    fill: "none",
    stroke: "#C0008D",
    strokeWidth: 2.4
  })), /*#__PURE__*/React.createElement("g", {
    className: "edge"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: slab.left,
    fill: "#C0008D"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: slab.right,
    fill: "#C0008D",
    opacity: 0.82
  })));
}
function Podium() {
  const base = prism(0, 0, 7, 7, PODIUM, 0);
  const glass = prism(0, 0, 7, 7, 2.2, 0.28);
  const mull = [];
  for (let i = 1; i < 5; i++) {
    const t = i / 5 * 7;
    mull.push(/*#__PURE__*/React.createElement("line", {
      key: 'a' + i,
      x1: q(t, 7, 0.28)[0],
      y1: q(t, 7, 0.28)[1],
      x2: q(t, 7, 2.48)[0],
      y2: q(t, 7, 2.48)[1],
      stroke: P.mullion,
      strokeWidth: 1.6
    }));
    mull.push(/*#__PURE__*/React.createElement("line", {
      key: 'b' + i,
      x1: q(7, t, 0.28)[0],
      y1: q(7, t, 0.28)[1],
      x2: q(7, t, 2.48)[0],
      y2: q(7, t, 2.48)[1],
      stroke: P.mullion,
      strokeWidth: 1.6
    }));
  }
  const z = 0.28;
  const lobby = [person('lp1', 2.4, 5.9, z, 1), person('lp2', 4.3, 5.4, z, 4), person('lp3', 6, 3.1, z, 2), person('lp4', 5.6, 1.4, z, 5)];
  return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polygon", {
    points: base.left,
    fill: shade(P.podium, 0.88)
  }), /*#__PURE__*/React.createElement("polygon", {
    points: base.right,
    fill: P.podium
  }), /*#__PURE__*/React.createElement("polygon", {
    points: flat(0.2, 0.2, 6.6, 6.6, z),
    fill: "#F3F1F5"
  }), Box('lcore', prism(0.4, 0.4, 1.8, 1.8, 2.1, z), P.core), lobby.map(p => p.el), /*#__PURE__*/React.createElement("polygon", {
    points: glass.left,
    fill: "url(#gGlassL)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: glass.right,
    fill: "url(#gGlassR)"
  }), mull, /*#__PURE__*/React.createElement("polygon", {
    points: glass.left,
    fill: "none",
    stroke: P.mullion,
    strokeWidth: 1.6
  }), /*#__PURE__*/React.createElement("polygon", {
    points: glass.right,
    fill: "none",
    stroke: P.mullion,
    strokeWidth: 1.6
  }), /*#__PURE__*/React.createElement("polygon", {
    points: base.top,
    fill: "none"
  }));
}
function Crown() {
  const band = prism(-0.16, -0.16, 7.32, 7.32, 0.34, 24.7);
  const cap = prism(0.9, 0.9, 5.2, 5.2, 0.5, 25.04);
  const mast = prism(7 / 2 - 0.05, 7 / 2 - 0.05, 0.1, 0.1, 2, 25.54);
  return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polygon", {
    points: band.left,
    fill: "url(#gBrandL)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: band.right,
    fill: "url(#gBrandR)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: band.top,
    fill: "#F2EAF4"
  }), Box('cap', cap, '#EDEAF0'), Box('mast', mast, '#B9B6BE'));
}
function BgBuildings() {
  return /*#__PURE__*/React.createElement("g", {
    opacity: 0.85
  }, BGS.map((b, i) => {
    const p = prism(b.x, b.y, b.w, b.d, b.h, 0);
    const bands = [];
    const n = Math.floor(b.h / 1.6);
    for (let t = 1; t <= n; t++) {
      const z = t * 1.6;
      bands.push(/*#__PURE__*/React.createElement("line", {
        key: t,
        x1: q(b.x, b.y + b.d, z)[0],
        y1: q(b.x, b.y + b.d, z)[1],
        x2: q(b.x + b.w, b.y + b.d, z)[0],
        y2: q(b.x + b.w, b.y + b.d, z)[1],
        stroke: "#FFFFFF",
        strokeWidth: 2.4,
        opacity: 0.75
      }));
      bands.push(/*#__PURE__*/React.createElement("line", {
        key: 'r' + t,
        x1: q(b.x + b.w, b.y, z)[0],
        y1: q(b.x + b.w, b.y, z)[1],
        x2: q(b.x + b.w, b.y + b.d, z)[0],
        y2: q(b.x + b.w, b.y + b.d, z)[1],
        stroke: "#FFFFFF",
        strokeWidth: 2.4,
        opacity: 0.6
      }));
    }
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("polygon", {
      points: p.left,
      fill: shade(b.c, 0.93)
    }), /*#__PURE__*/React.createElement("polygon", {
      points: p.right,
      fill: b.c
    }), /*#__PURE__*/React.createElement("polygon", {
      points: p.top,
      fill: shade(b.c, 1.04)
    }), bands);
  }));
}
function Ground() {
  return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("polygon", {
    points: flat(-3.2, -3.2, 13.4, 13.4, 0),
    fill: "#F4F3F6"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: flat(-1.6, -1.6, 10.2, 10.2, 0.02),
    fill: "#EDEBF0"
  }), [[-1.4, 8], [8.2, -1.2], [-2, 2.4], [8, 5.6], [2, 8.6]].map(([x, y], i) => plant('t' + i, x, y, 0).el), [[-1, 6.2, 3], [7.8, 2.2, 1], [3.2, 8.2, 5], [-1.6, 4, 0], [5.6, 7.9, 2]].map(([x, y, c], i) => person('wk' + i, x, y, 0, c).el));
}
const DEFS = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("linearGradient", {
  id: "gGlassL",
  x1: "0",
  y1: "0",
  x2: "0.9",
  y2: "1"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "0%",
  stopColor: "#E4EEF8",
  stopOpacity: "0.5"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "55%",
  stopColor: "#BFD2E6",
  stopOpacity: "0.34"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "100%",
  stopColor: "#D2E0EE",
  stopOpacity: "0.44"
})), /*#__PURE__*/React.createElement("linearGradient", {
  id: "gGlassR",
  x1: "1",
  y1: "0",
  x2: "0.1",
  y2: "1"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "0%",
  stopColor: "#F2F7FC",
  stopOpacity: "0.42"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "60%",
  stopColor: "#CFDEEE",
  stopOpacity: "0.26"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "100%",
  stopColor: "#E2ECF6",
  stopOpacity: "0.36"
})), /*#__PURE__*/React.createElement("linearGradient", {
  id: "gBrandL",
  x1: "0",
  y1: "0",
  x2: "1",
  y2: "0.4"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "0%",
  stopColor: "#CE0F8B"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "42%",
  stopColor: "#7A2BA0"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "78%",
  stopColor: "#2E64D8"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "100%",
  stopColor: "#43CFEA"
})), /*#__PURE__*/React.createElement("linearGradient", {
  id: "gBrandR",
  x1: "0",
  y1: "0.4",
  x2: "1",
  y2: "0"
}, /*#__PURE__*/React.createElement("stop", {
  offset: "0%",
  stopColor: "#43CFEA"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "26%",
  stopColor: "#2E64D8"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "62%",
  stopColor: "#7A2BA0"
}), /*#__PURE__*/React.createElement("stop", {
  offset: "100%",
  stopColor: "#CE0F8B"
})));
function Tower({
  floors,
  active,
  onPick,
  icons,
  badgeColors
}) {
  floors = floors ?? [];
  const tags = floors.map(d => {
    const [x, y] = anchor(d.level);
    return {
      d,
      left: (x - VIEWBOX.x) / VIEWBOX.w * 100,
      top: (y - VIEWBOX.y) / VIEWBOX.h * 100
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "tower",
    style: {
      aspectRatio: `${VIEWBOX.w} / ${VIEWBOX.h}`
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`,
    className: "scene"
  }, /*#__PURE__*/React.createElement("defs", null, DEFS), /*#__PURE__*/React.createElement(BgBuildings, null), /*#__PURE__*/React.createElement(Ground, null), /*#__PURE__*/React.createElement(Podium, null), floors.slice().reverse().map(d => /*#__PURE__*/React.createElement(Floor, {
    key: d.id,
    dep: d,
    active: d.id === active,
    dim: d.id !== active,
    onPick: onPick
  })), /*#__PURE__*/React.createElement(Crown, null), floors.map(d => {
    const [x, y] = anchor(d.level);
    return /*#__PURE__*/React.createElement("line", {
      key: d.id,
      className: 'lead' + (d.id === active ? ' on' : ''),
      x1: x,
      y1: y,
      x2: x + 58,
      y2: y
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "rail"
  }, tags.map(({
    d,
    left,
    top
  }, i) => /*#__PURE__*/React.createElement("button", {
    key: d.id,
    className: 'tag' + (d.id === active ? ' on' : ''),
    style: {
      left: left + '%',
      top: top + '%'
    },
    onClick: () => onPick(d.id),
    "aria-pressed": d.id === active,
    "data-track": "floor",
    "data-context": d.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge",
    style: {
      width: 26,
      height: 26,
      background: (badgeColors ?? ['#C0008D', '#6E2585', '#3667D9'])[i % 3]
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: 15,
    height: 15,
    fill: "none",
    stroke: "#fff",
    strokeWidth: 2.1,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    dangerouslySetInnerHTML: {
      __html: (icons ?? {})[d.icon] ?? ''
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "tag-l"
  }, d.label), /*#__PURE__*/React.createElement("span", {
    className: "tag-n"
  }, d.agents.length)))));
}
module.exports = {
  Tower
};
