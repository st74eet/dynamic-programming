'use strict'

function createMatrix(rows, cols) {
    const table = document.getElementById('dpMatrix');
    table.innerHTML = '';
    
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th'));
    
    for (let j = 0; j < cols; j++) {
        const th = document.createElement('th');
        th.textContent = string2.value[j] || '';
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);
    
    for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr');
        
        const th = document.createElement('th');
        th.textContent = string1.value[i] || '';
        tr.appendChild(th);
        
        for (let j = 0; j < cols; j++) {
            const td = document.createElement('td');
            td.className = 'matrix-cell';
            td.id = `cell-${i}-${j}`;
            td.textContent = '0';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

function updateCell(i, j, value, highlight = false) {
    const cell = document.getElementById(`cell-${i}-${j}`);
    cell.textContent = value;
    if (highlight) {
        cell.classList.add('input-section__highlighted');
        setTimeout(() => cell.classList.remove('input-section__highlighted'), 1000);
    }
}

function showStep(description) {
    document.getElementById('currentStep').textContent = description;
}

async function longest_common_subsequence(s1, s2) {
    const n = s1.length;
    const m = s2.length;
    
    const dp = Array(n + 1).fill().map(() => Array(m + 1).fill(0));
    const p = Array(n + 1).fill().map(() => Array(m + 1).fill(null));
    
    createMatrix(n + 1, m + 1);
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                p[i][j] = [i - 1, j - 1, s1[i - 1]];
                showStep(`Символи співпадають: ${s1[i-1]}, збільшуємо значення на 1`);
            } else {
                if (dp[i - 1][j] > dp[i][j - 1]) {
                    dp[i][j] = dp[i - 1][j];
                    p[i][j] = [i - 1, j, ''];
                    showStep('Беремо значення зверху');
                } else {
                    dp[i][j] = dp[i][j - 1];
                    p[i][j] = [i, j - 1, ''];
                    showStep('Беремо значення зліва');
                }
            }
            
            updateCell(i, j, dp[i][j], true);
        }
  }
  
  let current = [n, m];
  let lcs = "";
  
  while (current && !(current[0] === 0 && current[1] === 0)) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const [prev_i, prev_j, char] = p[current[0]][current[1]];
      if (char) {
          lcs += char;
          document.getElementById(`cell-${current[0]}-${current[1]}`).classList.add('path');
      }
      current = [prev_i, prev_j];
  }
  
  const result = lcs.split('').reverse().join('');
  document.getElementById('result').innerHTML = `
      <h3>Результат:</h3>
      <p>Найдовша спільна підпослідовність: <strong>${result}</strong></p>
      <p>Довжина: ${result.length}</p>
  `;
    
    return result;
}

function startVisualization() {
    const s1 = document.getElementById('string1').value;
    const s2 = document.getElementById('string2').value;
    longest_common_subsequence(s1, s2);
}