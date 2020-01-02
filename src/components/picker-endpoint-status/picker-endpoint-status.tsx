import { Component, h, Prop, Watch, State, ComponentWillLoad } from '@stencil/core';

enum EndpointStatus {
  LOADING,
  OK,
  NOK
}

@Component({
  tag: 'eva-config-picker-endpoint-status',
  styleUrl: 'picker-endpoint-status.scss',
  shadow: true
})
export class PickerEndpointStatus implements ComponentWillLoad {

  @Prop()
  endpoint: string;

  @State()
  endpointStatus: EndpointStatus = EndpointStatus.LOADING;

  @Watch('endpoint')
  onEndPointChange(newEndpoint: string, oldEndpoint: string) {
    console.log(newEndpoint);
    console.log(oldEndpoint);
    if (newEndpoint !== oldEndpoint) {
      this.setEndpointStatus(newEndpoint);
    }
  }

  componentWillLoad() {
    // Watch is not called the first time the prop is set. Therefor we will call the setEndpoint here the first time
    //
    this.setEndpointStatus(this.endpoint);
  }

  async setEndpointStatus(endpoint: string) {
    this.endpointStatus = EndpointStatus.LOADING;

    let status: EndpointStatus = EndpointStatus.NOK;

    try {

      const fetchResponse = await fetch(endpoint + '/status');

      const response = await fetchResponse.json();

      status = (response.status as string)?.toLowerCase() === 'ok' ? EndpointStatus.OK : EndpointStatus.NOK;
    } catch (error) {
      console.error(`[eva-config-endpoint-status] Failed to do fetch response getting status of endpoint ${endpoint}`, error);
    } finally {
      this.endpointStatus = status;
    }

    return status;
  }

  render() {
    if ( this.endpointStatus === EndpointStatus.LOADING ) {
      return <eva-config-picker-spinner size={20}></eva-config-picker-spinner>;
    }
    if ( this.endpointStatus === EndpointStatus.OK ) {
      return <div class="feedback success"></div>
    }
    if ( this.endpointStatus === EndpointStatus.NOK ) {
      return <div class="feedback error"></div>
    }
  }
}
