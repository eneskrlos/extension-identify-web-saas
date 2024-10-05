import { DataUser } from "@/interfaces/dataUser";


  export function buildTable(element: HTMLDivElement) {
    let data: any = {}
    let datos : DataUser;
    console.log('aqui esta')
    browser.storage.local.get('dataUser').then((dataUser) => {
        // Verifico si hay datos
        if (dataUser && dataUser.dataUser) {
            console.log('data: ', dataUser.dataUser);
            data = dataUser.dataUser
            datos = {
                ip: data.ip,
                requestId: data.requestId,
                statusCode: data.statusCode,
                tabId: data.tabId,
                token: data.token,
                url: data.url
            }  
            createTable(datos);
        } else {
            console.log('No hay datos en el storage');
            element.append(`
                    <h4>No hay datos en el storage</h4>
                `);
        }
      }).catch((error) => {
        console.error('Error al obtener datos del storage:', error);
      });
  }

  // Función para crear la tabla
  function createTable(data: DataUser) {
    const tableContainer = document.getElementById('table-container');
    console.log(document)
     const table = document.createElement('table');
    
    // Crear encabezados de la tabla
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = Object.keys(data) as Array<keyof DataUser>; // parsiando la data a un array de objetos de tipo DataUser

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Crear cuerpo de la tabla
    const tbody = document.createElement('tbody');
    const row = document.createElement('tr');
    
    headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = data[header]? data[header].toString() : ''; // Asignar el valor correspondiente del objeto
        row.appendChild(td);
    });

    tbody.appendChild(row);
    table.appendChild(tbody);
    tableContainer?.appendChild(table);
  }