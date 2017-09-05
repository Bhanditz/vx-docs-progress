var viz = d3.select("#viz");

function naCheck(entry) {
  if (entry === "na") {
    return "na";
  } else {
    return +entry * 2;
  }
}

var colNames = ["pkg", "working", "desc", "props", "example", "source"];

d3.tsv("data.tsv", function(error, data) {
  if (error) throw error;

  var rows = data.map(function(d) {
    return {
      name: d.package,
      link: d.link,
      prog: [
        naCheck(d.working),
        naCheck(d.description),
        naCheck(d.props),
        naCheck(d.example),
        naCheck(d.srcLink)
      ]
    };
  });

  console.log(rows);

  var topRow = viz
    .append("div")
    .attr("class", "colNames")
    .selectAll("cols")
    .data(colNames)
    .enter();

  topRow
    .append("div")
    .attr("class", "colTitle")
    .text(d => d);

  var table = viz
    .selectAll("rows")
    .data(rows)
    .enter();

  var rows = table
    .append("div")
    .html(d => `<a href=${d.link} class="name">${d.name}</div>`)
    .attr("class", "tableRow");

  rows
    .selectAll("entries")
    .data(d => d.prog)
    .enter()
    .append("div")
    .attr("class", d => `progRect color_${d}`);
});
