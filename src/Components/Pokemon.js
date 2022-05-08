/** @format */

import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";

export const Pokemon = ({ pokemonData, searchTerm }) => {
  const color1 = "rgba(245,0, 255,1)";
  const color2 = "rgba(255, 0, 255, 1)";
  const color3 = "rgba(0,255,0, 1)";
  const color4 = "rgba(0,0,255, 1)";
  const transparent = "rgba(0,0,0,0)";
  useEffect(() => {
    const fetchData = async () => {
      let details = await fetch(pokemonData.url);
      details = await details.json();
      console.log(details);
      let speciesDetails = await fetch(details.species.url);
      speciesDetails = await speciesDetails.json();

      const englishDescriptions = speciesDetails.flavor_text_entries.filter(
        (element) => {
          return element.language.name == "en";
        }
      );

      const dataDict = {
        name: details.name,
        id: details.id,
        image: details.sprites.front_default,
        types: details.types.map((type) => {
          return type.type.name;
        }),
        stats: details.stats,
        description:
          englishDescriptions[englishDescriptions.length - 1].flavor_text,
      };
      console.log(dataDict);
      setData(dataDict);
    };
    fetchData();
  }, []);

  const [data, setData] = useState(null);
  //   const [details, setDetails] = useState(null);
  //   const [speciesDetails, setSpeciesDetails] = useState(null);

  let match = false;
  if (data) {
    if (searchTerm === "") {
      match = true;
    } else if (data.types.includes(searchTerm.toLowerCase())) {
      match = true;
    } else if (data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      match = true;
    } else if (
      data.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      match = true;
    }
  }

  return (
    data &&
    match && (
      <div className="pokemon-container">
        <div>{data.id + " " + data.name}</div>
        <div>
          <img src={data.image} />
        </div>
        <div>
          {data.types.map((type, index) => {
            return (
              <div className={"type type-" + type} key={index}>
                {type}
              </div>
            );
          })}
        </div>
        <div className="radar-container">
          <Radar
            data={{
              labels: data.stats.map((element) => {
                return element.stat.name;
              }),
              datasets: [
                {
                  label: "",
                  data: data.stats.map((element) => {
                    return element.base_stat;
                  }),
                  borderColor: transparent,
                  backgroundColor: color1,
                  pointBackgroundColor: color3,
                  pointBorderColor: transparent,
                  pointRadius: 1.5,
                },
              ],
            }}
            width={130}
            height={130}
            options={{
              // borderColor: "rgb(255,255,0)",
              responsive: true,
              elements: {
                line: {
                  borderWidth: 2,
                  // tension: .2,
                },
              },
              scales: {
                radialLinear: {
                  suggestedMax: 160,
                  suggestedMin: 0,
                  // beginAtZero: true,
                  grid: {
                    // circular: true,
                    color: color4,
                  },
                  ticks: {
                    display: false,
                    count: 6,
                  },
                  gridLines: {
                    // color: "rgba(0,0,255, .1)", doesn't do anything?
                  },
                  angleLines: {
                    color: color3,
                  },
                  pointLabels: {
                    // display: false,
                    color: color3,
                  },
                },
              },
              legend: {
                display: false,
              },
              plugins: {
                legend: {
                  display: false,
                  labels: {
                    color: "rgb(255, 99, 132)",
                  },
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
        <div>{data.description}</div>
      </div>
    )
  );
};
