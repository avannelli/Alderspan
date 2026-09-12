/**
 * A cyanotype drafting sheet: blueprint ground, a fine grid over a coarse
 * one, a border frame and a title block in the corner. Children draw with
 * `currentColor`, which the sheet sets to the pale blueprint ink.
 */
function ArtFrame({
  id,
  label,
  aria,
  children,
}: {
  id: string;
  label: string;
  aria: string;
  children: React.ReactNode;
}) {
  const sheet = label.split("/")[0].trim();
  return (
    <svg
      className="page-art"
      viewBox="0 0 900 400"
      role="img"
      aria-label={aria}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern
          id={`${id}-fine`}
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M12 0H0V12"
            fill="none"
            stroke="currentColor"
            strokeWidth=".3"
            opacity=".14"
          />
        </pattern>
        <pattern
          id={id}
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <rect width="60" height="60" fill={`url(#${id}-fine)`} />
          <path
            d="M60 0H0V60"
            fill="none"
            stroke="currentColor"
            strokeWidth=".6"
            opacity=".3"
          />
        </pattern>
      </defs>

      {/* Sheet */}
      <rect width="900" height="400" fill="var(--bp-ground)" />
      <rect width="900" height="400" fill={`url(#${id})`} />

      {/* Border frame, as drawn on a real sheet */}
      <g fill="none" stroke="currentColor" opacity=".55">
        <rect x="10" y="10" width="880" height="380" strokeWidth="1.4" />
        <rect x="17" y="17" width="866" height="366" strokeWidth=".5" />
      </g>

      {children}

      {/* Title block */}
      <g>
        <rect
          x="620"
          y="318"
          width="270"
          height="72"
          fill="var(--bp-ground)"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity=".97"
        />
        <g fill="none" stroke="currentColor" strokeWidth=".6" opacity=".6">
          <path d="M620 342h270M620 366h270M760 366v24M815 366v24" />
        </g>
        <g
          fill="currentColor"
          fontFamily="var(--font-mono, monospace)"
          fontSize="9"
          letterSpacing="1.6"
        >
          <text x="630" y="335" fontSize="10">
            ALDERSPAN ENGINEERING
          </text>
          <text x="630" y="359" opacity=".85">
            {sheet}
          </text>
          <text x="630" y="382" opacity=".7">
            SCALE NTS
          </text>
          <text x="770" y="382" opacity=".7">
            REV A
          </text>
          <text x="825" y="382" opacity=".7">
            SHT 1/1
          </text>
        </g>
      </g>

      <g
        fill="currentColor"
        fontFamily="var(--font-mono, monospace)"
        fontSize="10"
        letterSpacing="2"
      >
        <text x="28" y="38">
          {label}
        </text>
        <text x="28" y="382" fontSize="9" opacity=".7">
          CONCEPT ONLY / NOT FOR CONSTRUCTION
        </text>
      </g>
    </svg>
  );
}
export function BridgeArt() {
  const towers = [268, 604];
  const deck = 236;
  return (
    <ArtFrame
      id="art-bridge"
      label="B—02 / CABLE-STAYED CONCEPT"
      aria="Original line drawing of a cable-stayed bridge, showing two towers, a fanned cable array and the main span over water"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="square">
        <g strokeWidth=".9" opacity=".55">
          {towers.map((x) =>
            Array.from({ length: 7 }, (_, i) => {
              const reach = 48 + i * 34;
              const anchor = 42 + i * 17;
              return (
                <path
                  key={x + "-" + i}
                  d={`M${x} ${anchor}L${x - reach} ${deck}M${x} ${anchor}L${x + reach} ${deck}`}
                />
              );
            }),
          )}
        </g>
        <g strokeWidth="1.6">
          {towers.map((x) => (
            <path
              key={x}
              d={`M${x - 20} ${deck + 34}L${x - 5} 34h10l15 ${deck}M${x - 13} 150h26M${x - 17} ${deck - 40}h34`}
            />
          ))}
        </g>
        <path strokeWidth="1.6" d="M8 236h884M8 248h884" />
        <path strokeWidth=".8" opacity=".6" d="M8 242h884" />
        <g strokeWidth=".7" opacity=".45">
          {Array.from({ length: 36 }, (_, i) => (
            <path key={i} d={`M${16 + i * 25} 236l12 12`} />
          ))}
        </g>
        <g strokeWidth="1.6">
          {towers.map((x) => (
            <path
              key={"p" + x}
              d={`M${x - 20} 248v76h40v-76M${x - 28} 324h56`}
            />
          ))}
          <path d="M8 248v52h34v-52M858 248v52h34v-52" />
        </g>
        <g strokeWidth=".9" opacity=".4">
          <path d="M0 330h900" />
          <path d="M28 346h140M640 346h150M96 376h150M330 376h120M520 376h96M660 376h180" />
        </g>
        <g strokeWidth=".8" opacity=".75">
          <path d="M268 356h336M268 348v16M604 348v16M262 362l6-6 6 6M598 362l6-6 6 6" />
        </g>
      </g>
      <text
        x="382"
        y="344"
        fill="currentColor"
        fontFamily="monospace"
        fontSize="10"
        letterSpacing="2"
      >
        MAIN SPAN
      </text>
    </ArtFrame>
  );
}
export function ArchArt() {
  const deck = 262;
  const left = 96;
  const right = 804;
  const rise = 168;
  const mid = (left + right) / 2;
  const archY = (x: number) =>
    deck - rise * (1 - ((x - mid) / ((right - left) / 2)) ** 2);
  const hangers = Array.from({ length: 15 }, (_, i) => left + 40 + i * 44);
  const curve = Array.from({ length: 61 }, (_, i) => {
    const x = left + (i * (right - left)) / 60;
    return `${i ? "L" : "M"}${x.toFixed(1)} ${archY(x).toFixed(1)}`;
  }).join("");
  return (
    <ArtFrame
      id="art-arch"
      label="A—01 / TIED ARCH STUDY"
      aria="Original line drawing of a tied-arch bridge with vertical hangers carrying a deck across a valley"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="square">
        <path strokeWidth="1.8" d={curve} />
        <path
          strokeWidth=".8"
          opacity=".5"
          d={curve}
          transform="translate(0 9)"
        />
        <g strokeWidth=".9" opacity=".65">
          {hangers.map((x) => (
            <path key={x} d={`M${x} ${archY(x).toFixed(1)}V${deck}`} />
          ))}
        </g>
        <path strokeWidth="1.6" d={`M20 ${deck}h860M20 ${deck + 12}h860`} />
        <g strokeWidth=".7" opacity=".4">
          {Array.from({ length: 34 }, (_, i) => (
            <path key={i} d={`M${28 + i * 25} ${deck}l12 12`} />
          ))}
        </g>
        <g strokeWidth="1.5">
          <path d={`M${left - 26} ${deck + 12}v54h52v-54M${left - 34} 328h68`} />
          <path
            d={`M${right - 26} ${deck + 12}v54h52v-54M${right - 34} 328h68`}
          />
          <path d="M20 274v40h34v-40M846 274v40h34v-40" />
        </g>
        <g strokeWidth=".9" opacity=".35">
          <path d="M0 340h900M64 362h150M280 362h120M470 362h180M700 362h150M140 382h190M420 382h120M600 382h150" />
        </g>
        <g strokeWidth=".8" opacity=".7">
          <path d="M300 74v46m-6-8 6 8 6-8M450 52v46m-6-8 6 8 6-8M600 74v46m-6-8 6 8 6-8" />
        </g>
      </g>
      <text
        x="404"
        y="42"
        fill="currentColor"
        fontFamily="monospace"
        fontSize="10"
        letterSpacing="2"
      >
        LOAD PATH
      </text>
    </ArtFrame>
  );
}
export function FrameArt() {
  const columns = [230, 400, 570, 740];
  const levels = [76, 128, 180, 232, 284];
  const base = 320;
  return (
    <ArtFrame
      id="art-frame"
      label="C—03 / LATERAL FRAME"
      aria="Original line drawing of a braced multi-storey structural frame with diagonal bracing, node plates and foundations"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="square">
        <g strokeWidth="1.5">
          {columns.map((x) => (
            <path key={x} d={`M${x} 60V${base}`} />
          ))}
        </g>
        <g strokeWidth="1.3">
          {levels.map((y) => (
            <path key={y} d={`M${columns[0]} ${y}h${columns[3] - columns[0]}`} />
          ))}
          <path d={`M${columns[0]} ${base}h${columns[3] - columns[0]}`} />
        </g>
        <g strokeWidth=".9" opacity=".6">
          {levels.map((y, row) => {
            const next = levels[row + 1] ?? base;
            return columns.slice(0, 3).map((x, col) => {
              const to = columns[col + 1];
              const flip = (row + col) % 2 === 0;
              return (
                <path
                  key={`${y}-${x}`}
                  d={
                    flip
                      ? `M${x} ${y}L${to} ${next}`
                      : `M${to} ${y}L${x} ${next}`
                  }
                />
              );
            });
          })}
        </g>
        <g strokeWidth=".8" opacity=".55">
          {levels.map((y) =>
            columns.map((x) => (
              <path key={`n${y}${x}`} d={`M${x - 7} ${y - 7}h14v14h-14z`} />
            )),
          )}
        </g>
        <g strokeWidth="1.4">
          {columns.map((x) => (
            <path key={"f" + x} d={`M${x - 22} ${base}v26h44v-26`} />
          ))}
          <path d={`M${columns[0] - 40} ${base + 26}h${columns[3] - columns[0] + 80}`} />
        </g>
        <g strokeWidth=".8" opacity=".45">
          {Array.from({ length: 22 }, (_, i) => (
            <path key={i} d={`M${196 + i * 25} ${base + 26}l-10 14`} />
          ))}
        </g>
        <g strokeWidth=".9" opacity=".75">
          <path d="M126 76h76m-10-6 10 6-10 6M126 180h76m-10-6 10 6-10 6M126 284h76m-10-6 10 6-10 6" />
          <path d="M824 60V320M818 60h12M818 320h12" />
        </g>
      </g>
      <g
        fill="currentColor"
        fontFamily="monospace"
        fontSize="10"
        letterSpacing="2"
      >
        <text x="128" y="52">
          WIND
        </text>
        <text x="800" y="196" transform="rotate(-90 800 196)">
          RISE
        </text>
      </g>
    </ArtFrame>
  );
}
export function PlanArt() {
  return (
    <ArtFrame
      id="art-plan"
      label="D—04 / SITE PLAN"
      aria="Original line drawing of a site plan with contour lines, a building footprint, a section line and a north arrow"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <g strokeWidth=".9" opacity=".4">
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={i}
              d="M0 330C180 268 360 300 540 214S800 118 900 148"
              transform={`translate(${i * 6} ${-i * 30})`}
            />
          ))}
        </g>
        <g strokeWidth="1.5">
          <path d="M250 150h230v96h-92v78H250z" />
          <path d="M480 150h98v54h-98" />
        </g>
        <g strokeWidth=".7" opacity=".45">
          {Array.from({ length: 11 }, (_, i) => (
            <path key={i} d={`M${256 + i * 20} 150L${236 + i * 20} 324`} />
          ))}
        </g>
        <g strokeWidth=".9" opacity=".7">
          <path d="M180 108h520" strokeDasharray="12 6" />
          <path d="M180 98v20M700 98v20M186 102l-6 6 6 6M694 102l6 6-6 6" />
        </g>
        <g strokeWidth="1">
          <path d="M812 98l22 70-22-14-22 14z" />
        </g>
        <g strokeWidth=".9" opacity=".6">
          <path d="M120 356h160M120 348v16M280 348v16M200 348v16" />
        </g>
        <g strokeWidth=".9" opacity=".55">
          <path d="M622 262l30 30M622 292l30-30" />
          <circle cx="637" cy="277" r="24" />
        </g>
      </g>
      <g
        fill="currentColor"
        fontFamily="monospace"
        fontSize="10"
        letterSpacing="2"
      >
        <text x="164" y="90">
          SECTION A—A
        </text>
        <text x="806" y="90">
          N
        </text>
        <text x="120" y="342">
          0 — 50m
        </text>
        <text x="600" y="242">
          SURVEY PT.
        </text>
      </g>
    </ArtFrame>
  );
}
export function NodeArt() {
  const cx = 452;
  const cy = 200;
  const bolts = [
    [-70, -30],
    [-36, -44],
    [-2, -58],
    [-62, 10],
    [-28, -4],
    [6, -18],
    [40, 20],
    [72, 8],
    [104, -4],
    [-16, 54],
    [18, 40],
    [52, 62],
  ];
  return (
    <ArtFrame
      id="art-node"
      label="E—05 / CONNECTION DETAIL"
      aria="Original line drawing of a bolted gusset-plate connection where three structural members meet"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="square">
        <path
          strokeWidth="1.5"
          d={`M${cx - 118} ${cy - 92}L${cx + 150} ${cy - 24}L${cx + 128} ${cy + 94}L${cx - 64} ${cy + 102}L${cx - 130} ${cy + 14}Z`}
        />
        <g strokeWidth="1.4">
          <path d="M36 116l300 78M36 156l300 78M36 116v40" />
          <path d="M712 92L540 150M744 106L572 164M712 92l32 14" />
          <path d="M396 386V282M440 386V282M396 386h44" />
        </g>
        <g strokeWidth=".8" opacity=".5">
          {Array.from({ length: 11 }, (_, i) => (
            <path key={"a" + i} d={`M${48 + i * 26} ${119 + i * 6.8}v39`} />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <path
              key={"b" + i}
              d={`M${706 - i * 28} ${94 + i * 9.4}l-32 -14`}
              transform="translate(0 28)"
            />
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <path key={"c" + i} d={`M396 ${300 + i * 26}h44`} />
          ))}
        </g>
        <g strokeWidth=".9">
          {bolts.map(([dx, dy]) => (
            <circle key={`${dx}-${dy}`} cx={cx + dx} cy={cy + dy} r="6" />
          ))}
          <g opacity=".4">
            {bolts.map(([dx, dy]) => (
              <path
                key={`c${dx}-${dy}`}
                d={`M${cx + dx - 11} ${cy + dy}h22M${cx + dx} ${cy + dy - 11}v22`}
              />
            ))}
          </g>
        </g>
        <g strokeWidth=".8" opacity=".65">
          <path d={`M${cx + 150} ${cy - 24}l70 -46h84`} />
          <path d={`M${cx - 130} ${cy + 14}l-74 62H128`} />
          <path d="M418 336h-96l-26-24" />
        </g>
      </g>
      <g
        fill="currentColor"
        fontFamily="monospace"
        fontSize="10"
        letterSpacing="2"
      >
        <text x="710" y="146">
          GUSSET PLATE 12mm
        </text>
        <text x="34" y="282">
          M24 BOLTS / 2 ROWS
        </text>
        <text x="228" y="308">
          TIE MEMBER
        </text>
      </g>
    </ArtFrame>
  );
}
export function SurveyArt() {
  const stations: [number, number, string][] = [
    [160, 288, "ST—01"],
    [452, 116, "ST—02"],
    [764, 264, "ST—03"],
  ];
  return (
    <ArtFrame
      id="art-survey"
      label="F—06 / SITE TRIANGULATION"
      aria="Original line drawing of a survey triangulation between three stations with range arcs around a marked studio location"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path strokeWidth="1.2" d="M160 288L452 116L764 264Z" />
        <g strokeWidth=".8" opacity=".5" strokeDasharray="7 6">
          <path d="M452 116V330M160 288L600 332M764 264L330 332" />
        </g>
        <g strokeWidth="1.3">
          {stations.map(([x, y]) => (
            <g key={x}>
              <path d={`M${x} ${y - 16}l14 25h-28z`} />
              <circle cx={x} cy={y - 1} r="3.4" />
            </g>
          ))}
        </g>
        <g strokeWidth=".9" opacity=".45">
          {[34, 66, 98].map((r) => (
            <circle key={r} cx="452" cy="284" r={r} />
          ))}
        </g>
        <g strokeWidth="1.4">
          <path d="M452 250c-17 0-30 13-30 29 0 21 30 47 30 47s30-26 30-47c0-16-13-29-30-29z" />
          <circle cx="452" cy="279" r="9" />
        </g>
        <g strokeWidth=".8" opacity=".55">
          <path d="M60 352h180M60 344v16M240 344v16" />
          <path d="M822 92V56M814 66l8-10 8 10" />
        </g>
      </g>
      <g
        fill="currentColor"
        fontFamily="monospace"
        fontSize="10"
        letterSpacing="2"
      >
        {stations.map(([x, y, name]) => (
          <text key={name} x={x - 24} y={y - 26}>
            {name}
          </text>
        ))}
        <text x="492" y="286">
          STUDIO
        </text>
        <text x="66" y="338">
          BASE LINE
        </text>
        <text x="812" y="46">
          N
        </text>
      </g>
    </ArtFrame>
  );
}
