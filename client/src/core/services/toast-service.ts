import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() {

    this.createToastContainer();
   }

  private createToastContainer() {
    let container = document.getElementById('toast-container');

    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end p-4';
      container.style.position = 'fixed';
      container.style.top = '1rem';
      container.style.right = '1rem';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
    }
}

private createToastElement(message: string, msgType: string, duration: number = 5000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return ;

    const toast = document.createElement('div');  
    toast.classList.add('alert',msgType,'shadow-lg','mt-10','relative');
    toast.style.minWidth = '250px';
    toast.innerHTML = `
    <div class="flex justify-between items-center w-full max-w-24">
     <button class=" btn btn-sm btn-ghost btn-circle absolute top-1 right-1">X</button>
    <span>${message}</span>
   
    </div>
    `

    toast.querySelector('button')?.addEventListener('click', () => {
        toast.remove();
    });

    toastContainer.appendChild(toast);

    setTimeout(() => {  
      if(toastContainer.contains(toast))
        toastContainer.removeChild(toast);
    }, duration);

    return toast;
}
  success(message: string, duration?: number) {
    this.createToastElement(message, 'alert-success', duration);
  }

    error(message: string, duration?: number) {
    this.createToastElement(message, 'alert-error', duration);
  }

    info(message: string, duration?: number) {
    this.createToastElement(message, 'alert-info', duration);
  }

    warning(message: string, duration?: number) {
    this.createToastElement(message, 'alert-warning', duration);
  }

}
