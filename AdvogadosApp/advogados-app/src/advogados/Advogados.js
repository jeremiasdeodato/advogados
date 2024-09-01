import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import ViewAdvogado from './_viewAdvogado';
import AddAdvogado from './_addAdvogado';
import EditAdvogado from './_editAdvogado';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { SenioridadeLabels } from '../enums/senioridades.enum'; // Importa o enum

function Advogados() {
  const [advogados, setAdvogadosList] = useState([]);
  const [showViewMode, setShowViewMode] = useState(false);
  const [showAddMode, setShowAddMode] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [selectedAdvogadoId, setSelectedAdvogadoId] = useState(null);

  useEffect(() => {
    ListarAdvogados();
  }, []);

  const ListarAdvogados = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/Advogados/consultar',
      );
      if (response) {
        setAdvogadosList(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const actionsTemplate = (rowData) => {
    return (
      <>
        <button
          className="btn btn-success"
          data-pr-tooltip="Visualizar"
          onClick={() => {
            setSelectedAdvogadoId(rowData.id);
            setShowViewMode(true);
          }}
        >
          <i className="pi pi-eye"></i>
        </button>
        <button
          className="btn btn-primary"
          data-pr-tooltip="Editar"
          onClick={() => {
            setSelectedAdvogadoId(rowData.id);
            setShowEditMode(true);
          }}
        >
          <i className="pi pi-file-edit"></i>
        </button>
        <button
          className="btn btn-danger"
          data-pr-tooltip="Excluir"
          onClick={() => deleteAdvogadoConfirm(rowData.id)}
        >
          <i className="pi pi-trash"></i>
        </button>
      </>
    );
  };

  const deleteAdvogadoConfirm = (advogadoId) => {
    confirmDialog({
      message: 'Tem certeza de que deseja excluir?',
      header: 'Confirmação',
      icon: 'pi pi-trash',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => deleteAdvogado(advogadoId),
    });
  };

  const deleteAdvogado = async (advogadoId) => {
    try {
      const response = await axios.delete(
        'http://localhost:5000/api/Advogados/excluir/' + advogadoId,
      );
      if (response) {
        ListarAdvogados();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const formatSenioridade = (rowData) => {
    return SenioridadeLabels[rowData.senioridade] || 'Desconhecida';
  };

  return (
    <div className="advogados-page">
      <div className="container">
        <h1>CADASTRO DE ADVOGADOS</h1>

        <div className="advogados-list">
          <div className="addNewAdvogado">
            <button
              className="btn btn-success"
              onClick={() => setShowAddMode(true)}
            >
              Adicionar novo advogado <i className="pi pi-plus"></i>
            </button>
          </div>
          <DataTable value={advogados}>
            <Column field="id" header="Id"></Column>
            <Column field="nome" header="Nome"></Column>
            <Column field="email" header="Email"></Column>
            <Column
              field="senioridade"
              header="Senioridade"
              body={formatSenioridade}
            ></Column>
            <Column header="Ações" body={actionsTemplate}></Column>
          </DataTable>
        </div>
      </div>
      <Dialog
        header="Visualização"
        visible={showViewMode}
        style={{ width: '70vw' }}
        onHide={() => setShowViewMode(false)}
      >
        <ViewAdvogado advogadoId={selectedAdvogadoId} />
      </Dialog>

      <Dialog
        header="Adição"
        visible={showAddMode}
        style={{ width: '70vw' }}
        onHide={() => setShowAddMode(false)}
      >
        <AddAdvogado
          setAdvogadoAdded={() => {
            setShowAddMode(false);
            ListarAdvogados();
          }}
        />
      </Dialog>

      <Dialog
        header="Edição"
        visible={showEditMode}
        style={{ width: '70vw' }}
        onHide={() => setShowEditMode(false)}
      >
        <EditAdvogado
          advogadoId={selectedAdvogadoId}
          setAdvogadoEdited={() => {
            setShowEditMode(false);
            ListarAdvogados();
          }}
        />
      </Dialog>
      <ConfirmDialog />
    </div>
  );
}

export default Advogados;
