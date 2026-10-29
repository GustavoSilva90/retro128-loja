/*
 * contador.js — contador regressivo da campanha Black Friday
 */

const historicoContador = [];

function formatarTempo(ms) {
  const total = Math.floor(ms / 1000);
  const dias = Math.floor(total / 86400);
  const horas = Math.floor((total % 86400) / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segundos = total % 60;
  const dois = (n) => String(n).padStart(2, '0');
  return `<b>${dias}</b>d <b>${dois(horas)}</b>h <b>${dois(minutos)}</b>m <b>${dois(segundos)}</b>s`;
}

function iniciarContador(campanha) {
  const banner = document.getElementById('banner-bf');
  const alvo = banner.querySelector('.bf-tempo');
  const fim = new Date(campanha.fim).getTime();
  banner.hidden = false;

  Observabilidade.registrarMedidor('historico_contador', () => historicoContador.length);

  function tick() {
    const restante = Math.max(0, fim - Date.now());
    
    // Limita o histórico a 50 registos para evitar estouro de memória
    if (historicoContador.length >= 50) {
      historicoContador.shift();
    }
    
    historicoContador.push({
      instante: Date.now(),
      restante: restante
    });
    
    Observabilidade.contar('contador_ticks');
    alvo.innerHTML = formatarTempo(restante);
  }

  tick();
  Observabilidade.info('CONTADOR_INICIADO', 'Contador da Black Friday ativo', {
    fim: campanha.fim, intervalo: 1000
  });
  
  // Converte segundos em milissegundos (multiplica por 1000)
  const intervaloMs = (campanha.intervaloContadorSegundos || 1) * 1000;
  return setInterval(tick, intervaloMs);
}