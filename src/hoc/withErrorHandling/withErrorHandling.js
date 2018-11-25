import React from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandling = (WrappedComponent, axios) => (
    class extends React.Component {
        state = {
            error: null
        }
        componentDidMount() {
            this.requestInterceptor = axios.interceptors.request.use(config => {
                this.setState({error: null});
                return config;
            }, error => {
                this.setState({error});
                return Promise.reject(error);
            });
            this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error});
                return Promise.reject(error);
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }
        cancelErrorModal = () => {
            this.setState({error: null});
        }
        render() {
            return (
                <>
                    <Modal
                        show={Boolean(this.state.error)}
                        cancel={this.cancelErrorModal}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
);

export default withErrorHandling;