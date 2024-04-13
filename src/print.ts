export function printV(value: any, color: string = 'yellow') {
    const element = document.querySelector('#bubbles')!;

    function wrapInBubble(value: any) {
        return `<div class="bubble" style="background: ${color}">${value}</div>`;
    }

    if(value) {
        element.innerHTML = element.innerHTML + wrapInBubble(value);
    }
}
