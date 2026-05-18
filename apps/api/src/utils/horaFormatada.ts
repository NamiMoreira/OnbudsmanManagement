export function formatarDataCustom(data: Date) {
  const dataObj = new Date(data);
  const dias = ["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
  const meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

  const diaSemana = dias[dataObj.getDay()];
  const dia = dataObj.getDate();
  const mes = meses[dataObj.getMonth()];
  const ano = dataObj.getFullYear();
  const hora = dataObj.getHours().toString().padStart(2,"0");
  const minuto = dataObj.getMinutes().toString().padStart(2,"0");

  return `${diaSemana}, ${dia} de ${mes} de ${ano} às ${hora}:${minuto}`;
}