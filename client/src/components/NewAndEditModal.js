import React from 'react';
import Button from './Button';
import Modal from 'react-modal';

export default function NewAndEditModal({
  children,
  modalIsOpen,
  closeModal,
  customStyles,
  enableRadio,
}) {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div style={styles.modalContainer}>
            <h6 style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {children}
            </h6>
            <Button
              style={styles.closeBtn}
              className="btn red"
              type="icon"
              onClick={closeModal}
            >
              close
            </Button>
          </div>

          <div style={styles.formContainer}>
            <form className="col s12">
              <div style={styles.radioContainer}>
                <p>
                  <label>
                    <input type="radio" name="type" disabled={enableRadio} />
                    <span
                      className={!enableRadio ? 'red-text accent-1-text' : ''}
                    >
                      <b>Despesa</b>
                    </span>
                  </label>
                </p>
                <p>
                  <label>
                    <input type="radio" name="type" disabled={enableRadio} />
                    <span
                      className={!enableRadio ? 'green-text accent-1-text' : ''}
                    >
                      <b>Receita</b>
                    </span>
                  </label>
                </p>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input type="text" id="descrição" className="validate" />
                  <label className="active" htmlFor="descrição">
                    Descrição:
                  </label>
                </div>
                <div className="input-field col s12">
                  <input type="text" id="categoria" className="validate" />
                  <label className="active" htmlFor="categoria">
                    Categoria:
                  </label>
                </div>
                <div className="input-field col s6">
                  <input
                    type="number"
                    step="0.01"
                    id="value"
                    className="validate"
                  />
                  <label className="active" htmlFor="value">
                    Valor:
                  </label>
                </div>
                <div className="input-field col s6">
                  <input type="date" id="date" className="validate" />
                </div>
              </div>
              <input type="submit" value="Salvar" className="btn" />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid gray',
    borderRadius: '5px',
    padding: '5px',
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '10px',
    paddingLeft: '10px',
  },
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  radioContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
};
