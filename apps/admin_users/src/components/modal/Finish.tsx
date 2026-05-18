// src/components/modal/Finish.tsx
import React, { useState } from 'react';
// Remove essa linha se não tiver o arquivo CSS
// import './ModalFinalizarDemanda.css';

interface ModalFinalizarDemandaProps {
    show: boolean;
    onHide: () => void;
    protocolo: string;
    demandaId: number | string;
    onSuccess?: (data: any) => void;
}

// MUDE DE export const ModalFinalizarDemanda PARA export default
const ModalFinalizarDemanda: React.FC<ModalFinalizarDemandaProps> = ({ 
    show, 
    onHide, 
    protocolo, 
    demandaId, 
    onSuccess 
}) => {
    const [resolucao, setResolucao] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [arquivos, setArquivos] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const formatarTamanho = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const adicionarArquivos = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;
        
        const filesArray = Array.from(files);
        const invalidFiles = filesArray.filter(file => file.size > 10 * 1024 * 1024);
        if (invalidFiles.length > 0) {
            setError('Alguns arquivos excedem o limite de 10MB');
            return;
        }
        
        setArquivos([...arquivos, ...filesArray]);
        setError('');
    };

    const removerArquivo = (index: number) => {
        const novosArquivos = [...arquivos];
        novosArquivos.splice(index, 1);
        setArquivos(novosArquivos);
    };

    const finalizarDemanda = async () => {
        if (!resolucao.trim()) {
            setError('Por favor, informe a resolução da ocorrência');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('protocol', protocolo);
            formData.append('resolucao', resolucao);
            formData.append('observacoes', observacoes);
            formData.append('demandaId', String(demandaId));
            
            arquivos.forEach((arquivo) => {
                formData.append('file', arquivo);
            });

            const response = await fetch('http://192.168.30.26:8090/occurrence/finish', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                if (onSuccess) {
                    onSuccess(data);
                }
                onHide();
                setResolucao('');
                setObservacoes('');
                setArquivos([]);
            } else {
                setError(data.message || data.text || 'Erro ao finalizar demanda');
            }
        } catch (err) {
            console.error('Erro na requisição:', err);
            setError('Erro de conexão com o servidor. Verifique sua rede.');
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">
                            <i className="bi bi-check-circle me-2"></i>
                            Finalizar Demanda
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
                    </div>

                    <div className="modal-body">
                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {error}
                                <button type="button" className="btn-close" onClick={() => setError('')}></button>
                            </div>
                        )}

                        <div className="alert alert-info mb-3">
                            <i className="bi bi-info-circle me-2"></i>
                            <strong>Protocolo:</strong> {protocolo || 'N/A'}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                <strong>Resolução da Ocorrência</strong> <span className="text-danger">*</span>
                            </label>
                            <textarea
                                className="form-control"
                                rows={5}
                                value={resolucao}
                                onChange={(e) => setResolucao(e.target.value)}
                                placeholder="Descreva detalhadamente como a demanda foi resolvida..."
                                disabled={loading}
                            />
                            <div className="form-text text-muted">
                                Forneça uma descrição clara e objetiva da resolução.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                <i className="bi bi-paperclip me-1"></i>
                                Anexos
                            </label>
                            
                            <div className="mb-2">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => document.getElementById('uploadArquivosFinish')?.click()}
                                    disabled={loading}
                                >
                                    <i className="bi bi-plus me-1"></i> Adicionar Arquivo
                                </button>
                                <span className="text-muted ms-2">
                                    <small>Formatos: PDF, JPG, PNG, DOC (Max. 10MB)</small>
                                </span>
                            </div>

                            <input
                                type="file"
                                id="uploadArquivosFinish"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                onChange={adicionarArquivos}
                                style={{ display: 'none' }}
                                disabled={loading}
                            />

                            <div className="border rounded p-2" style={{ minHeight: '100px', backgroundColor: '#f8f9fa' }}>
                                {arquivos.length === 0 ? (
                                    <div className="text-muted text-center py-3">
                                        <i className="bi bi-cloud-upload" style={{ fontSize: '24px' }}></i>
                                        <div>Nenhum arquivo selecionado</div>
                                    </div>
                                ) : (
                                    arquivos.map((arquivo, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center p-2 mb-2 bg-white border rounded">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-file-earmark me-2 text-primary"></i>
                                                <span>{arquivo.name}</span>
                                                <span className="text-muted ms-2 small">({formatarTamanho(arquivo.size)})</span>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-link btn-sm text-danger"
                                                onClick={() => removerArquivo(index)}
                                                disabled={loading}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                <i className="bi bi-chat me-1"></i>
                                Observações Adicionais
                            </label>
                            <textarea
                                className="form-control"
                                rows={2}
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                                placeholder="Observações complementares (opcional)..."
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide} disabled={loading}>
                            <i className="bi bi-x me-1"></i> Cancelar
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-success" 
                            onClick={finalizarDemanda}
                            disabled={loading || !resolucao.trim()}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Finalizando...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check me-1"></i> Finalizar Demanda
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// EXPORT DEFAULT - essa é a parte importante!
export default ModalFinalizarDemanda;