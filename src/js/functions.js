'use strict';

/**
 * Generate a random number from [from] to [to]
 * @param {number} from
 * @param {number} to
 * @returns {number}
 */
const random_number = (from, to) => {
    return Math.floor((Math.random() * (to - from)) + from);
}

/**
 * Generate a random string of the specified length
 * @param {number} max_length Min length
 * @param {number} min_length Max length
 * @param {boolean} capitalize_first True if you want to capitalize the first character
 * @returns {string}
 */
const random_string = (max_length, min_length = 1, capitalize_first = true) => {
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sagittis, nisi vitae consectetur volutpat, ipsum mi facilisis mi, ac condimentum erat est id odio. Pellentesque vitae enim ut ex porttitor ornare. Nunc a elit ut elit ultrices ultrices at eu est. Sed eleifend mi velit, ut tincidunt massa consequat nec. Integer ac diam lacus. Vivamus nisi urna, volutpat in fringilla in, tincidunt eu mauris. Donec fermentum sem erat, mollis elementum lectus suscipit sed. Vestibulum fermentum lacus eu arcu efficitur, id tincidunt nisi posuere. Praesent lorem lacus, pellentesque et nulla quis, posuere aliquet purus. Donec massa purus, commodo porta nulla vel, suscipit ultricies justo. Pellentesque a placerat neque. Sed faucibus tellus sapien, eget consequat elit porta a. Ut nec lacus sem. Ut eu odio efficitur, dignissim enim eget, sollicitudin quam. Donec pellentesque massa imperdiet congue cursus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam blandit, arcu ut ultricies pretium, eros dolor molestie sem, a sagittis eros turpis sit amet eros. Phasellus dapibus orci eget dolor ullamcorper rutrum. Sed eget vehicula metus. Proin dolor nisl, gravida ac porttitor ut, tincidunt vitae ipsum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent mattis faucibus pulvinar. Quisque aliquam scelerisque nisl, luctus imperdiet nibh tincidunt non. Proin sed dictum nibh. Ut elementum erat non nisi tincidunt tempus. Sed dui orci, consectetur non aliquet at, tincidunt feugiat mi. Duis neque diam, tempor at tempor quis, interdum id tellus. Phasellus vel massa quis tortor cursus aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras vehicula erat at tortor tristique, at pretium sem semper. Suspendisse sed condimentum augue, id porttitor dui. Ut sapien tellus, consequat a tincidunt vel, fringilla sit amet enim. Nam semper dapibus odio, fermentum tristique tortor dignissim sit amet. Nam sollicitudin pellentesque efficitur. Quisque vestibulum quis ipsum nec vehicula. Fusce at lacinia magna. Nunc auctor tortor dui, ac dapibus leo lobortis nec. Cras eget ex lacus. Quisque euismod sem erat, quis congue diam cursus in. Ut efficitur orci id feugiat aliquam. Mauris consequat pulvinar mauris in dignissim. Aliquam venenatis sagittis scelerisque. Morbi accumsan turpis ac mauris egestas faucibus et id felis. Ut nec felis quis augue ultricies posuere. Integer facilisis velit sit amet justo porta, sodales iaculis tellus semper. Vestibulum porttitor venenatis gravida. Fusce quis leo accumsan orci auctor sodales bibendum sit amet mi.';
    const splitted = lorem.split(' ');
    const from = random_number(0, splitted.length - 5);
    const words = random_number(min_length, max_length);
    let str = splitted.splice(from, words).join(' ');
    if (capitalize_first) {
        str = str.charAt(0).toUpperCase() + str.substr(1);
    }
    return str;
};

/**
 * Convert seconds into a human readable string
 * @param {number} duration Seconds
 * @returns {string}
 */
const durationToReadableTime = duration => {
    let tmp = duration / 60;
    let minutes = Math.floor(tmp);
    tmp = tmp - minutes;
    const seconds = Math.round(tmp * 60);

    if (minutes >= 60) {
        tmp = minutes / 60;
        const hours = Math.floor(tmp);
        tmp = tmp - hours;
        minutes = Math.round(tmp * 60);
        return `${hours}h ${minutes}m`;
    }

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
