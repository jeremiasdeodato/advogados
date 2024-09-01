import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Senioridades, SenioridadeLabels } from '../enums/senioridades.enum';
import { Estados, EstadoLabels } from '../enums/estados.enum';
import InputMask from 'react-input-mask';

const initialAdvogadoInfo = {
  id: '',
  nome: '',
  dataDeNascimento: '',
  email: '',
  senioridade: Senioridades.JUNIOR,
  endereco: {
    logradouro: '',
    bairro: '',
    estado: '',
    numero: '',
    complemento: '',
    cep: '',
  },
};

function ViewAdvogado(props) {
  const [advogadoInfo, setAdvogadoInfo] = useState(initialAdvogadoInfo);

  useEffect(() => {
    fetchAdvogadoData();
  }, []);

  const fetchAdvogadoData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/Advogados/consultar/${props.advogadoId}`,
      );
      if (response) {
        const formattedData = {
          ...response.data,
          dataDeNascimento: response.data.dataDeNascimento
            ? new Date(response.data.dataDeNascimento)
                .toISOString()
                .split('T')[0]
            : '',
        };
        setAdvogadoInfo(formattedData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="advogado-view">
      <h1>Dados Pessoais</h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Nome:</span>
              <input
                type="text"
                className="form-control"
                value={advogadoInfo.nome}
                readOnly
                onChange={(e) =>
                  setAdvogadoInfo({ ...advogadoInfo, nome: e.target.value })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Data de Nascimento:</span>
              <input
                type="date"
                className="form-control"
                value={advogadoInfo.dataDeNascimento}
                readOnly
                onChange={(e) =>
                  setAdvogadoInfo({
                    ...advogadoInfo,
                    dataDeNascimento: e.target.value,
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Email:</span>
              <input
                type="email"
                className="form-control"
                value={advogadoInfo.email}
                readOnly
                onChange={(e) =>
                  setAdvogadoInfo({ ...advogadoInfo, email: e.target.value })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Senioridade:</span>
              <select
                className="form-control"
                value={advogadoInfo.senioridade}
                disabled
                onChange={(e) =>
                  setAdvogadoInfo({
                    ...advogadoInfo,
                    senioridade: parseInt(e.target.value, 10),
                  })
                }
              >
                <option value="">Selecione</option>
                {Object.entries(SenioridadeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </p>
          </div>
        </div>
      </div>

      <h1>Endereço</h1>
      <div className="box">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Cep:</span>
              <InputMask
                mask="99999-999"
                className="form-control"
                value={advogadoInfo.endereco.cep}
                readOnly
                onChange={(e) =>
                  setAdvogadoInfo({
                    ...advogadoInfo,
                    endereco: {
                      ...advogadoInfo.endereco,
                      cep: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Logradouro:</span>
              <input
                type="text"
                className="form-control"
                value={advogadoInfo.endereco.logradouro}
                readOnly
                onChange={(e) =>
                  setAdvogadoInfo({
                    ...advogadoInfo,
                    endereco: {
                      ...advogadoInfo.endereco,
                      logradouro: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Numero:</span>
              <input
                type="number"
                className="form-control"
                value={advogadoInfo.endereco.numero}
                readOnly
                onChange={(e) =>
                  setAdvogadoInfo({
                    ...advogadoInfo,
                    endereco: {
                      ...advogadoInfo.endereco,
                      numero: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Complemento:</span>
              <input
                type="text"
                className="form-control"
                value={advogadoInfo.endereco.complemento}
                readOnly
                onChange={(e) =>
                  setAdvogadoInfo({
                    ...advogadoInfo,
                    endereco: {
                      ...advogadoInfo.endereco,
                      complemento: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Bairro:</span>
              <input
                type="text"
                className="form-control"
                value={advogadoInfo.endereco.bairro}
                readOnly
                onChange={(e) =>
                  setAdvogadoInfo({
                    ...advogadoInfo,
                    endereco: {
                      ...advogadoInfo.endereco,
                      bairro: e.target.value,
                    },
                  })
                }
              />
            </p>
          </div>
          <div className="col-sm-12 col-md-6">
            <p>
              <span>Estado:</span>
              <select
                className="form-control"
                value={advogadoInfo.endereco.estado}
                disabled
                onChange={(e) =>
                  setAdvogadoInfo({
                    ...advogadoInfo,
                    endereco: {
                      ...advogadoInfo.endereco,
                      estado: e.target.value,
                    },
                  })
                }
              >
                <option value="">Selecione o estado</option>

                {Object.entries(EstadoLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAdvogado;
