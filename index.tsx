/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// These are loaded from the index.html
declare const tmImage: any;
declare const tf: any;

// --- Constants and State ---
const MODEL_URL = './model.json';
const METADATA_URL = './metadata-1.json';

const ICONS = {
    organic: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21c.5 -4.5 2.5 -8 7 -10" /><path d="M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12.986 13" /></svg>`,
    inorganic: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10h-14l4 -4" /><path d="M7 14h14l-4 4" /></svg>`,
};

const UI_STRINGS = {
    start_title: 'Phân Loại Rác Thải AI 🌿',
    start_subtitle: 'Sẵn sàng để biến thế giới thành một nơi sạch hơn?',
    start_button: 'Bắt đầu Phân loại',
    app_title: 'Phân Loại Rác Thải AI 🌿',
    app_subtitle: 'Hướng camera của bạn vào một vật thể để phân loại rác.',
    status_loading: 'Đang tải mô hình...',
    status_camera: 'Đang yêu cầu quyền truy cập camera...',
    status_error: 'Lỗi! Không thể khởi động. Vui lòng cấp quyền camera và tải lại trang.',
    status_ready: 'Sẵn sàng phân loại...',
    start_predict_button: 'Phân loại liên tục',
    stop_predict_button: 'Dừng Phân loại',
    classify_once_button: 'Phân loại 1 lần',
    history_title: 'Lịch sử phân loại',
    empty_history: 'Chưa có mục nào trong lịch sử.',
    confidence: 'Độ chính xác',
};

const LABEL_TRANSLATIONS = {
    'Rác hữu cơ': { vi: 'Rác hữu cơ', en: 'Organic Waste' },
    'Rác vô cơ': { vi: 'Rác vô cơ', en: 'Inorganic Waste' },
};

const TIP_BANK = {
    'Rác hữu cơ': [
        "Rác hữu cơ có thể được ủ làm phân bón compost, rất tốt cho cây trồng.",
        "Hãy dùng rác thực vật để bón cho các gốc cây trong vườn nhà bạn.",
        "Giảm lãng phí thực phẩm bằng cách lên kế hoạch cho bữa ăn và bảo quản đồ ăn đúng cách.",
        "Vỏ trứng, bã cà phê, và lá trà đều là những loại rác hữu cơ tuyệt vời để làm phân bón.",
        "Lá cây khô, cành cây nhỏ có thể được cắt nhỏ và thêm vào đống ủ để tăng độ tơi xốp.",
        "Không nên bỏ thịt, cá, sữa vào thùng ủ phân tại nhà vì chúng dễ gây mùi và thu hút động vật.",
        "Cỏ cắt và các loại rác vườn khác là nguồn cung cấp nitơ tuyệt vời cho phân compost.",
        "Bã mía, rơm rạ cũng là rác hữu cơ có thể ủ thành phân.",
        "Tránh bỏ dầu mỡ thừa vào thùng rác hữu cơ, chúng làm chậm quá trình phân hủy.",
        "Bạn có thể dùng thùng ủ compost chuyên dụng hoặc tự làm một hố ủ đơn giản trong vườn.",
        "Ủ phân compost đúng cách sẽ không có mùi hôi, ngược lại còn có mùi đất ẩm tự nhiên.",
        "Giấy ăn, khăn giấy đã qua sử dụng (không dính hóa chất tẩy rửa mạnh) có thể được ủ cùng rác hữu cơ.",
        "Tóc và lông động vật cũng là rác hữu cơ, chúng phân hủy và cung cấp nitơ cho đất.",
        "Để tăng tốc độ phân hủy, hãy cắt nhỏ rác hữu cơ trước khi cho vào thùng ủ.",
        "Duy trì độ ẩm thích hợp cho đống ủ là rất quan trọng, không quá khô cũng không quá ướt.",
        "Các loại vỏ trái cây như vỏ chuối, vỏ cam rất giàu kali, tốt cho cây ra hoa và đậu quả.",
        "Tro từ gỗ không qua xử lý hóa chất có thể thêm vào phân compost để bổ sung khoáng chất."
    ],
    'Rác vô cơ': [
        "Hãy làm sạch chai lọ, hộp nhựa trước khi bỏ vào thùng rác để tái chế hiệu quả hơn.",
        "Pin, bóng đèn hỏng, và các thiết bị điện tử cần được thu gom riêng vì chứa chất độc hại.",
        "Tách riêng các loại rác vô cơ như nhựa, giấy, kim loại để tiện cho việc tái chế.",
        "Nhiều loại nhựa có thể tái chế. Hãy tìm biểu tượng tái chế trên sản phẩm.",
        "Hộp sữa, hộp giấy đựng đồ uống lỏng cần được tráng sạch và làm dẹt trước khi tái chế.",
        "Quần áo, vải cũ có thể được quyên góp hoặc tái sử dụng làm giẻ lau thay vì vứt bỏ.",
        "Thủy tinh là vật liệu có thể tái chế 100% mà không bị giảm chất lượng. Hãy nhớ phân loại chai lọ thủy tinh.",
        "Đồ kim loại như lon nhôm, vỏ hộp sắt có giá trị tái chế cao. Hãy gom chúng lại.",
        "Túi ni lông sạch có thể được tái sử dụng nhiều lần trước khi vứt bỏ, hoặc gom lại để tái chế.",
        "Hộp xốp (styrofoam) rất khó tái chế, hãy hạn chế sử dụng chúng.",
        "Giấy đã qua sử dụng một mặt có thể dùng làm giấy nháp.",
        "Đừng vứt kim tiêm, vật sắc nhọn vào thùng rác chung. Hãy bỏ chúng vào hộp cứng, đậy kín và ghi chú rõ ràng.",
        "Vỏ lon nhôm có thể được tái chế thành lon mới chỉ trong vòng 60 ngày, tiết kiệm 95% năng lượng so với sản xuất mới.",
        "Nhiều chương trình đổi rác tái chế lấy quà tặng được tổ chức, hãy tìm hiểu ở địa phương bạn.",
        "Đồ nhựa dùng một lần như ống hút, muỗng, nĩa là nguồn ô nhiễm lớn. Hãy ưu tiên các sản phẩm tái sử dụng.",
        "Giấy vụn, giấy báo cũ có thể được tái chế để sản xuất giấy vệ sinh, thùng carton.",
        "Chai nhựa PET (thường dùng đựng nước suối) có giá trị tái chế cao, có thể dùng để sản xuất sợi polyester cho ngành dệt may.",
        "Trước khi vứt một món đồ, hãy nghĩ xem nó có thể được sửa chữa, cho tặng hay tái chế không."
    ],
};


let model: any;
let webcam: any;
let labelContainer: HTMLElement | null;
let maxPredictions: number;
let isPlayingAudio = false;
let isPredicting = false;
let voices: SpeechSynthesisVoice[] = [];
let speechSynthKeepAliveInterval: number;
let availableCameras: MediaDeviceInfo[] = [];
let currentCameraIndex = 0;

// State management
const classificationHistory: { image: string, label: string, timestamp: number, tip?: string }[] = [];
let lastDisplayedClass: string | null = null;
let lastPredictionTime = 0;
let lastSavedClass = '';

// --- Speech Synthesis ---
function loadVoices() {
    if (!window.speechSynthesis) return;

    const updateVoices = () => {
        voices = window.speechSynthesis.getVoices();
    };

    // Get voices initially, and set up a listener for any changes.
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
}

function startSpeechSynthKeepAlive() {
    if (!window.speechSynthesis) return;
    stopSpeechSynthKeepAlive(); // Clear any existing interval first
    speechSynthKeepAliveInterval = window.setInterval(() => {
        if (!isPlayingAudio) {
            window.speechSynthesis.resume();
        }
    }, 5000); // Resume every 5 seconds to prevent timeout
}

function stopSpeechSynthKeepAlive() {
    clearInterval(speechSynthKeepAliveInterval);
}

async function speakResult(className: string): Promise<void> {
    if (isPlayingAudio) return;

    const translatedLabel = LABEL_TRANSLATIONS[className as keyof typeof LABEL_TRANSLATIONS]?.en;
    if (!translatedLabel || !window.speechSynthesis) {
        return;
    }

    return new Promise((resolve) => {
        isPlayingAudio = true;
        window.speechSynthesis.cancel(); // Cancel any previous speech

        const utterance = new SpeechSynthesisUtterance(translatedLabel);

        // Find and set a specific voice for better reliability
        const englishVoice = voices.find(voice => voice.lang.startsWith('en-'));
        if (englishVoice) {
            utterance.voice = englishVoice;
        } else {
            // Fallback if no specific voice is found
            utterance.lang = 'en-US';
            if (voices.length > 0) { // Only warn if voices were loaded but none matched
                console.warn('Could not find an English voice, falling back to lang property.');
            }
        }
        
        utterance.rate = 0.9;
        utterance.pitch = 1.1;

        let fallbackTimeout: number;

        const cleanupAndResolve = () => {
            clearTimeout(fallbackTimeout);
            // Check flag to ensure this logic runs only once
            if (isPlayingAudio) {
                isPlayingAudio = false;
                resolve();
            }
        };

        // Set a fallback timer in case 'onend' or 'onerror' never fire on some mobile browsers
        fallbackTimeout = window.setTimeout(() => {
            console.warn('Speech synthesis fallback timeout triggered.');
            cleanupAndResolve();
        }, 5000); // 5-second safety net

        utterance.onend = cleanupAndResolve;
        
        utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
            // The 'interrupted' error is common, especially when stopping predictions
            // or on mobile browsers. It's not a critical failure, so we can
            // handle it gracefully without logging a scary red error.
            if (event.error !== 'interrupted') {
                console.error("SpeechSynthesisUtterance.onerror - Speech failed. Error:", event.error, "Event:", event);
            }
            cleanupAndResolve();
        };
        
        // Ensure the synthesis engine is not paused before speaking
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
    });
}

// --- Camera & Model ---

async function detectCameras() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.warn("enumerateDevices() not supported.");
        return;
    }
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        availableCameras = devices.filter(({ kind }) => kind === "videoinput");
        const switchCameraButton = document.getElementById('switch-camera-button');
        if (switchCameraButton && availableCameras.length > 1) {
            switchCameraButton.classList.remove('hidden');
        }
    } catch (err) {
        console.error("Error detecting cameras:", err);
    }
}


async function setupWebcam(deviceId?: string) {
    const webcamContainer = document.getElementById('webcam-container');
    if (!webcamContainer) return;
    
    // Stop existing webcam if it's running
    if (webcam) {
        await webcam.stop();
    }

    const flip = true;
    const size = 400;
    webcam = new tmImage.Webcam(size, size, flip);
    
    const constraints: any = {
        facingMode: "environment"
    };
    if (deviceId) {
        constraints.deviceId = { exact: deviceId };
        // When specifying a deviceId, we should not specify facingMode
        delete constraints.facingMode;
    }

    await webcam.setup(constraints);
    await webcam.play();
    
    // Replace the canvas in the DOM
    const existingCanvas = webcamContainer.querySelector('canvas');
    if (existingCanvas) {
        existingCanvas.remove();
    }
    webcamContainer.prepend(webcam.canvas);
}


async function switchCamera() {
    if (availableCameras.length <= 1) return;
    currentCameraIndex = (currentCameraIndex + 1) % availableCameras.length;
    const nextDeviceId = availableCameras[currentCameraIndex].deviceId;
    await setupWebcam(nextDeviceId);
}


async function init() {
    const statusText = document.getElementById('status-text');
    const webcamContainer = document.getElementById('webcam-container');
    const controlsContainer = document.getElementById('controls-container');
    if (webcamContainer) webcamContainer.style.display = 'none';
    if (controlsContainer) controlsContainer.style.display = 'none';

    try {
        if (statusText) statusText.textContent = UI_STRINGS.status_loading;
        model = await tmImage.load(MODEL_URL, METADATA_URL);
        maxPredictions = model.getTotalClasses();

        if (statusText) statusText.textContent = UI_STRINGS.status_camera;
        
        await detectCameras();
        const initialDeviceId = availableCameras.length > 0 ? availableCameras[currentCameraIndex].deviceId : undefined;
        await setupWebcam(initialDeviceId);

        window.requestAnimationFrame(loop);

        if (statusText) statusText.style.display = 'none';
        if (webcamContainer) webcamContainer.style.display = 'block';
        if (controlsContainer) controlsContainer.style.display = 'flex';
        setupUI();
    } catch (error) {
        console.error("Initialization failed:", error);
        if (statusText) {
            statusText.textContent = UI_STRINGS.status_error;
            statusText.style.color = 'red';
        }
    }
}

// --- UI & Prediction Loop ---

function setupUI() {
    labelContainer = document.getElementById('label-container');
    if (labelContainer) {
        labelContainer.innerHTML = '';
    }

    const startPredictButton = document.getElementById('start-predict-button');
    const stopPredictButton = document.getElementById('stop-predict-button');
    const switchCameraButton = document.getElementById('switch-camera-button');
    const classifyOnceButton = document.getElementById('classify-once-button');

    if (startPredictButton && stopPredictButton && labelContainer && switchCameraButton && classifyOnceButton) {
        startPredictButton.addEventListener('click', () => {
            isPredicting = true;
            startPredictButton.classList.add('hidden');
            stopPredictButton.classList.remove('hidden');
            startSpeechSynthKeepAlive();
        });

        stopPredictButton.addEventListener('click', () => {
            isPredicting = false;
            startPredictButton.classList.remove('hidden');
            stopPredictButton.classList.add('hidden');
            labelContainer.innerHTML = '';
            lastDisplayedClass = null;
            lastSavedClass = '';
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel(); // Stop any ongoing speech
            }
            stopSpeechSynthKeepAlive();
        });

        switchCameraButton.addEventListener('click', switchCamera);
        classifyOnceButton.addEventListener('click', classifyOnce);
    }
}

async function loop() {
    if (webcam) {
        webcam.update();
        if (isPredicting && !isPlayingAudio) {
            await predict();
        }
        window.requestAnimationFrame(loop);
    }
}

async function predict() {
    if (!model || !webcam || !labelContainer || !webcam.canvas) return;

    const isLoading = !!labelContainer.querySelector('.loading-indicator');

    const predictions = await model.predict(webcam.canvas);
    let bestClass = '';
    let highestProb = 0;
    
    for (let i = 0; i < maxPredictions; i++) {
        if (predictions[i].probability > highestProb) {
            highestProb = predictions[i].probability;
            bestClass = predictions[i].className;
        }
    }

    const displayClass = bestClass === 'Rác tái chế' ? 'Rác vô cơ' : bestClass;

    if (highestProb > 0.80) {
        // Always update the card to show real-time confidence.
        updatePredictionCard(displayClass, highestProb);
        lastDisplayedClass = displayClass;

        if (highestProb > 0.95) {
            const now = Date.now();
            if (displayClass !== lastSavedClass || now - lastPredictionTime > 5000) {
                lastPredictionTime = now;
                lastSavedClass = displayClass;
                const imageSrc = webcam.canvas.toDataURL('image/jpeg');
                addToHistory(imageSrc, displayClass);
                
                // Speak the result. The loop is paused while this happens.
                await speakResult(displayClass);
            }
        }
    } else {
        // If confidence is low, and we were previously showing a card or a loader, clear it.
        if (lastDisplayedClass !== null || isLoading) {
            lastDisplayedClass = null;
            lastSavedClass = ''; // Reset saved class so we can detect the same object again if it comes back
            labelContainer.innerHTML = '';
        }
    }
}

async function classifyOnce() {
    if (!model || !webcam || !webcam.canvas) return;

    const classifyOnceButton = document.getElementById('classify-once-button') as HTMLButtonElement;
    if (classifyOnceButton) classifyOnceButton.disabled = true;

    const webcamContainer = document.getElementById('webcam-container');
    if (webcamContainer) {
        const shutter = document.createElement('div');
        shutter.className = 'shutter-effect';
        webcamContainer.appendChild(shutter);
        // Clean up the shutter element after the animation
        setTimeout(() => shutter.remove(), 350);
    }

    try {
        // A small delay to allow the shutter effect to be visible
        await new Promise(resolve => setTimeout(resolve, 100));

        const predictions = await model.predict(webcam.canvas);
        let bestClass = '';
        let highestProb = 0;

        for (let i = 0; i < maxPredictions; i++) {
            if (predictions[i].probability > highestProb) {
                highestProb = predictions[i].probability;
                bestClass = predictions[i].className;
            }
        }

        // Use a reasonable threshold for adding to history
        if (highestProb > 0.75) {
            const displayClass = bestClass === 'Rác tái chế' ? 'Rác vô cơ' : bestClass;
            const imageSrc = webcam.canvas.toDataURL('image/jpeg');
            addToHistory(imageSrc, displayClass);
            await speakResult(displayClass);
        }
        // No 'else' block needed, as per requirement to only show results in history.
    } catch (error) {
        console.error("Single classification failed:", error);
    } finally {
        if (classifyOnceButton) classifyOnceButton.disabled = false;
    }
}

function updatePredictionCard(label: string, confidence: number) {
    if (!labelContainer) return;

    const isOrganic = label === 'Rác hữu cơ';
    const colorClass = isOrganic ? 'organic' : 'inorganic';
    const icon = isOrganic ? ICONS.organic : ICONS.inorganic;
    
    const translatedLabel = LABEL_TRANSLATIONS[label as keyof typeof LABEL_TRANSLATIONS].vi;
    const confidenceText = UI_STRINGS.confidence;

    // Only re-animate if the class is different
    const animationClass = (label !== lastDisplayedClass) ? 'animate' : '';

    labelContainer.innerHTML = `
        <div class="prediction-card ${colorClass} ${animationClass}">
            <div class="icon">${icon}</div>
            <div class="details">
                <p class="label">${translatedLabel}</p>
                <p class="confidence">${confidenceText}: ${Math.round(confidence * 100)}%</p>
            </div>
        </div>
    `;
}

function showLoadingIndicator() {
    if (!labelContainer) return;
    labelContainer.innerHTML = `
        <div class="loading-indicator">
            <div class="spinner"></div>
            <p>${UI_STRINGS.status_ready}</p>
        </div>
    `;
}

// --- History Management ---

function addToHistory(imageSrc: string, label: string) {
    const timestamp = Date.now();
    
    const tipsForLabel = TIP_BANK[label as keyof typeof TIP_BANK] || [];
    const randomTip = tipsForLabel.length > 0
        ? tipsForLabel[Math.floor(Math.random() * tipsForLabel.length)]
        : undefined;

    const historyItem = { image: imageSrc, label, timestamp, tip: randomTip };

    classificationHistory.unshift(historyItem);
    if (classificationHistory.length > 20) {
        classificationHistory.pop();
    }
    renderHistory();
}

function renderHistory() {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;

    historyList.innerHTML = '';

    if (classificationHistory.length === 0) {
        historyList.innerHTML = `<p class="empty-history">${UI_STRINGS.empty_history}</p>`;
        return;
    }

    classificationHistory.forEach(itemData => {
        const item = document.createElement('div');
        const isOrganic = itemData.label === 'Rác hữu cơ';
        const colorClass = isOrganic ? 'organic' : 'inorganic';
        const icon = isOrganic ? ICONS.organic : ICONS.inorganic;

        item.className = `history-item ${colorClass}`;
        
        const translatedLabel = LABEL_TRANSLATIONS[itemData.label as keyof typeof LABEL_TRANSLATIONS].vi;
        const timeString = new Date(itemData.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

        const tipContent = itemData.tip 
                ? `<div class="gemini-info">💡 ${itemData.tip}</div>`
                : '';

        item.innerHTML = `
            <img src="${itemData.image}" alt="Snapshot of ${itemData.label}" loading="lazy">
            <div class="icon ${colorClass}">${icon}</div>
            <div class="info">
                <div class="info-main">
                    <span class="label">${translatedLabel}</span>
                    <span class="timestamp">${timeString}</span>
                </div>
                ${tipContent}
            </div>
        `;
        
        historyList.appendChild(item);
    });
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    loadVoices(); // Proactively load voices on page load

    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const mainContainer = document.getElementById('main-container');

    if (startButton && startScreen && mainContainer) {
        startButton.addEventListener('click', () => {
            document.body.classList.add('app-view');
            startScreen.classList.add('hidden');
            mainContainer.classList.remove('hidden');
            init();
        });
    }
});