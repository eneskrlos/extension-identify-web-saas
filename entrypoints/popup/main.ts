import './style.css';
import typescriptLogo from '@/assets/typescript.svg';
import viteLogo from '/wxt.svg';
import { buildTable } from '@/components/tableDataUser';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://wxt.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="WXT logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>WXT + TypeScript</h1>
    <div class="card">
      <div id="table-container"></div>
    </div>
   
  </div>
`;

buildTable(document.querySelector<HTMLDivElement>('#table-container')!)
