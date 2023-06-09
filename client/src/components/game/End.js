import parseJSX from '../../parseJSX';
import cupSrc from '../../../assets/cup.png';
import bombSrc from '../../../assets/bomb.svg';

export default ({ winner, time }) => {
  if (typeof winner === 'string')
    return (
      <div class='modal-wrapper'>
        <div class='modal'>
          <div class='end'>
            <span class='game-over-text'>gra sie skonczyla chyba</span>
            <div class='winner'>
              <img src={cupSrc} />
              <span class='winner-text'>Zwycienzca</span>
            </div>
            <span class='winner-name'>{winner}</span>
            <span class='end-element'>Czas: {time / 1000}s</span>
          </div>
        </div>
      </div>
    );

  return (
    <div class='modal-wrapper'>
      <div class='modal'>
        <div class='end'>
          <span class='game-over-text'>gra sie skonczyla chyba</span>
          <div class='winner'>
            <img src={winner ? cupSrc : bombSrc} />
            <span class='winner-text'>{winner ? 'Zwycienstwo!' : 'Przegrana...'}</span>
          </div>
          <span class='end-element'>Czas: {time / 1000}s</span>
        </div>
      </div>
    </div>
  );
}