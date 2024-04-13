export function printV(value: any) {
    const element = document.querySelector('#bubbles')!;

    function wrapInBubble(value: any) {
        return `<div class="bubble">${value}</div>`;
    }

    if(value) {
        element.innerHTML = element.innerHTML + wrapInBubble(value);
    }
}
